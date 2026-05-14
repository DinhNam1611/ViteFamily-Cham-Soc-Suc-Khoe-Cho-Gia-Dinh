/**
 * Migration 6: Medical records, files, prescriptions, reminders
 * Tables: medical_records, medical_files, prescriptions,
 *         prescription_items, reminders
 */

exports.up = async function (knex) {
  // ── medical_records ───────────────────────────────────────────────
  await knex.schema.createTable('medical_records', (t) => {
    t.increments('id').primary();
    t.integer('member_id').unsigned().notNullable()
      .references('id').inTable('members').onDelete('CASCADE');
    t.integer('appointment_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('appointments').onDelete('SET NULL');
    t.date('visit_date').notNullable();
    t.string('hospital_name', 150).notNullable();
    t.string('doctor_name', 100).nullable().defaultTo(null);
    t.text('reason').nullable();
    t.text('diagnosis').nullable();
    t.text('notes').nullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_record_member      ON medical_records(member_id)`);
  await knex.raw(`CREATE INDEX idx_record_appointment ON medical_records(appointment_id)`);

  // ── medical_files ─────────────────────────────────────────────────
  await knex.schema.createTable('medical_files', (t) => {
    t.increments('id').primary();
    t.integer('medical_record_id').unsigned().notNullable()
      .references('id').inTable('medical_records').onDelete('CASCADE');
    t.string('file_url', 500).notNullable();
    t.string('file_type', 10).notNullable();
    t.string('file_name', 200).notNullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE medical_files ADD CONSTRAINT chk_file_type CHECK (file_type IN ('image','pdf'))`);
  await knex.raw(`CREATE INDEX idx_file_record ON medical_files(medical_record_id)`);

  // ── prescriptions ─────────────────────────────────────────────────
  await knex.schema.createTable('prescriptions', (t) => {
    t.increments('id').primary();
    t.integer('medical_record_id').unsigned().notNullable()
      .references('id').inTable('medical_records').onDelete('CASCADE');
    t.integer('doctor_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('doctors').onDelete('SET NULL');
    t.text('notes').nullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_presc_record ON prescriptions(medical_record_id)`);

  // ── prescription_items ────────────────────────────────────────────
  await knex.schema.createTable('prescription_items', (t) => {
    t.increments('id').primary();
    t.integer('prescription_id').unsigned().notNullable()
      .references('id').inTable('prescriptions').onDelete('CASCADE');
    t.string('medicine_name', 200).notNullable();
    t.string('dosage', 100).notNullable();
    t.string('frequency', 100).notNullable();
    t.jsonb('time_slots').nullable();
    t.date('start_date').notNullable();
    t.date('end_date').nullable().defaultTo(null);
    t.text('notes').nullable();
  });
  await knex.raw(`CREATE INDEX idx_item_prescription ON prescription_items(prescription_id)`);

  // ── reminders ─────────────────────────────────────────────────────
  await knex.schema.createTable('reminders', (t) => {
    t.increments('id').primary();
    t.integer('prescription_item_id').unsigned().notNullable()
      .references('id').inTable('prescription_items').onDelete('CASCADE');
    t.timestamp('remind_time', { useTz: false }).notNullable();
    t.string('status', 10).notNullable().defaultTo('pending');
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE reminders ADD CONSTRAINT chk_reminder_status CHECK (status IN ('pending','sent','taken','skipped'))`);
  await knex.raw(`CREATE INDEX idx_reminder_time   ON reminders(remind_time)`);
  await knex.raw(`CREATE INDEX idx_reminder_status ON reminders(status)`);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('reminders');
  await knex.schema.dropTableIfExists('prescription_items');
  await knex.schema.dropTableIfExists('prescriptions');
  await knex.schema.dropTableIfExists('medical_files');
  await knex.schema.dropTableIfExists('medical_records');
};
