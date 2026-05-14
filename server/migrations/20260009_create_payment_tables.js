/**
 * Migration 9: Payment module tables + circular FK on appointments
 * Tables: payments, refunds, payouts, payment_settings
 * Also: ALTER TABLE appointments ADD FK for payment_id
 */

exports.up = async function (knex) {
  // ── payments ──────────────────────────────────────────────────────
  await knex.schema.createTable('payments', (t) => {
    t.increments('id').primary();
    t.integer('appointment_id').unsigned().notNullable().unique()
      .references('id').inTable('appointments').onDelete('RESTRICT');
    t.integer('patient_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('RESTRICT');
    t.decimal('amount', 10, 2).notNullable();
    t.string('status', 10).notNullable().defaultTo('pending');
    t.string('method', 10).notNullable().defaultTo('mock');
    t.timestamp('paid_at', { useTz: false }).nullable().defaultTo(null);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE payments ADD CONSTRAINT chk_payment_status CHECK (status IN ('pending','paid','failed','refunded'))`);
  await knex.raw(`ALTER TABLE payments ADD CONSTRAINT chk_payment_method CHECK (method IN ('mock'))`);
  await knex.raw(`CREATE INDEX idx_payment_patient ON payments(patient_id)`);
  await knex.raw(`CREATE INDEX idx_payment_status  ON payments(status)`);
  await knex.raw(`CREATE INDEX idx_payment_paid_at ON payments(paid_at)`);

  // ── refunds ───────────────────────────────────────────────────────
  await knex.schema.createTable('refunds', (t) => {
    t.increments('id').primary();
    t.integer('payment_id').unsigned().notNullable()
      .references('id').inTable('payments').onDelete('RESTRICT');
    t.integer('appointment_id').unsigned().notNullable().unique()
      .references('id').inTable('appointments').onDelete('RESTRICT');
    t.decimal('amount', 10, 2).notNullable();
    t.integer('percent').notNullable();
    t.string('reason', 255).nullable().defaultTo(null);
    t.string('reject_reason', 255).nullable().defaultTo(null);
    t.string('status', 12).notNullable().defaultTo('pending');
    t.timestamp('requested_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('processed_at', { useTz: false }).nullable().defaultTo(null);
    t.integer('processed_by').unsigned().nullable().defaultTo(null)
      .references('id').inTable('users').onDelete('SET NULL');
  });
  await knex.raw(`ALTER TABLE refunds ADD CONSTRAINT chk_refund_percent CHECK (percent IN (0,50,80,100))`);
  await knex.raw(`ALTER TABLE refunds ADD CONSTRAINT chk_refund_status  CHECK (status IN ('pending','completed','rejected'))`);
  await knex.raw(`CREATE INDEX idx_refund_payment ON refunds(payment_id)`);
  await knex.raw(`CREATE INDEX idx_refund_status  ON refunds(status)`);

  // ── payouts ───────────────────────────────────────────────────────
  await knex.schema.createTable('payouts', (t) => {
    t.increments('id').primary();
    t.integer('hospital_id').unsigned().notNullable()
      .references('id').inTable('hospitals').onDelete('RESTRICT');
    t.decimal('amount', 12, 2).notNullable();
    t.decimal('commission', 12, 2).notNullable();
    t.string('period', 7).notNullable();
    t.integer('appointment_count').notNullable().defaultTo(0);
    t.string('status', 12).notNullable().defaultTo('pending');
    t.text('note').nullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('completed_at', { useTz: false }).nullable().defaultTo(null);
    t.integer('created_by').unsigned().nullable().defaultTo(null)
      .references('id').inTable('users').onDelete('SET NULL');
    t.integer('completed_by').unsigned().nullable().defaultTo(null)
      .references('id').inTable('users').onDelete('SET NULL');
    t.unique(['hospital_id', 'period'], { indexName: 'uq_payout_hospital_period' });
  });
  await knex.raw(`ALTER TABLE payouts ADD CONSTRAINT chk_payout_status CHECK (status IN ('pending','completed'))`);
  await knex.raw(`CREATE INDEX idx_payout_status ON payouts(status)`);
  await knex.raw(`CREATE INDEX idx_payout_period ON payouts(period)`);

  // ── payment_settings ──────────────────────────────────────────────
  await knex.schema.createTable('payment_settings', (t) => {
    t.increments('id').primary();
    t.string('key_name', 50).notNullable().unique();
    t.string('value', 255).notNullable();
    t.string('description', 200).nullable().defaultTo(null);
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`
    CREATE TRIGGER trg_payment_settings_updated_at
    BEFORE UPDATE ON payment_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);

  // Default settings
  await knex('payment_settings').insert([
    { key_name: 'commission_rate',    value: '15', description: 'Phần trăm hoa hồng VitaFamily giữ lại (%)' },
    { key_name: 'refund_tier1_hours', value: '24', description: 'Huỷ trước ≥ N giờ → hoàn 100%' },
    { key_name: 'refund_tier2_hours', value: '12', description: 'Huỷ trước ≥ N giờ → hoàn 80%' },
    { key_name: 'refund_tier3_hours', value: '6',  description: 'Huỷ trước ≥ N giờ → hoàn 50% (dưới ngưỡng = 0%)' },
  ]);

  // ── Circular FK: appointments.payment_id → payments.id ───────────
  await knex.schema.alterTable('appointments', (t) => {
    t.foreign('payment_id').references('payments.id').onDelete('SET NULL');
  });
};

exports.down = async function (knex) {
  // Remove circular FK first
  await knex.schema.alterTable('appointments', (t) => {
    t.dropForeign(['payment_id']);
  });
  await knex.schema.dropTableIfExists('payment_settings');
  await knex.schema.dropTableIfExists('payouts');
  await knex.schema.dropTableIfExists('refunds');
  await knex.schema.dropTableIfExists('payments');
};
