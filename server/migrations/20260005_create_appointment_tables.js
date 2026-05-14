/**
 * Migration 5: Appointment + examination result tables
 * Tables: appointments, examination_results
 *
 * NOTE: appointments.payment_id FK is added in migration 9
 *       after payments table is created (circular dependency).
 */

exports.up = async function (knex) {
  // ── appointments ──────────────────────────────────────────────────
  await knex.schema.createTable('appointments', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    t.integer('member_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('members').onDelete('SET NULL');
    t.integer('doctor_id').unsigned().notNullable()
      .references('id').inTable('doctors').onDelete('RESTRICT');
    t.integer('hospital_id').unsigned().notNullable()
      .references('id').inTable('hospitals').onDelete('RESTRICT');
    t.integer('slot_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('slots').onDelete('SET NULL');
    t.string('appointment_type', 10).notNullable().defaultTo('clinic');
    t.date('appointment_date').notNullable();
    t.text('reason').nullable();
    t.string('status', 12).notNullable().defaultTo('pending');
    t.string('payment_status', 10).notNullable().defaultTo('unpaid');
    // payment_id: column present, FK added in migration 9
    t.integer('payment_id').unsigned().nullable().defaultTo(null);
    t.text('reason_cancel').nullable();
    t.string('guest_name', 100).nullable().defaultTo(null);
    t.string('guest_phone', 15).nullable().defaultTo(null);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE appointments ADD CONSTRAINT chk_appt_type           CHECK (appointment_type IN ('clinic','home','video'))`);
  await knex.raw(`ALTER TABLE appointments ADD CONSTRAINT chk_appt_status         CHECK (status           IN ('pending','confirmed','completed','cancelled'))`);
  await knex.raw(`ALTER TABLE appointments ADD CONSTRAINT chk_appt_payment_status CHECK (payment_status   IN ('unpaid','paid','refunded'))`);
  await knex.raw(`CREATE INDEX idx_appt_user           ON appointments(user_id)`);
  await knex.raw(`CREATE INDEX idx_appt_doctor         ON appointments(doctor_id)`);
  await knex.raw(`CREATE INDEX idx_appt_status         ON appointments(status)`);
  await knex.raw(`CREATE INDEX idx_appt_payment_status ON appointments(payment_status)`);
  await knex.raw(`CREATE INDEX idx_appt_date           ON appointments(appointment_date)`);
  await knex.raw(`
    CREATE TRIGGER trg_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);

  // ── examination_results ───────────────────────────────────────────
  await knex.schema.createTable('examination_results', (t) => {
    t.increments('id').primary();
    t.integer('appointment_id').unsigned().notNullable().unique()
      .references('id').inTable('appointments').onDelete('CASCADE');
    t.text('diagnosis').nullable();
    t.text('notes').nullable();
    t.text('treatment_plan').nullable();
    t.date('follow_up_date').nullable().defaultTo(null);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('examination_results');
  await knex.schema.dropTableIfExists('appointments');
};
