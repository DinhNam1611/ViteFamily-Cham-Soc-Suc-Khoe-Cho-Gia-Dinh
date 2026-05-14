/**
 * Migration 4: Schedule and time-slot tables
 * Tables: doctor_schedules, slots
 */

exports.up = async function (knex) {
  // ── doctor_schedules ──────────────────────────────────────────────
  await knex.schema.createTable('doctor_schedules', (t) => {
    t.increments('id').primary();
    t.integer('doctor_id').unsigned().notNullable()
      .references('id').inTable('doctors').onDelete('CASCADE');
    t.integer('hospital_id').unsigned().notNullable()
      .references('id').inTable('hospitals').onDelete('CASCADE');
    t.date('date').notNullable();
    t.boolean('is_off').notNullable().defaultTo(false);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.unique(['doctor_id', 'hospital_id', 'date'], { indexName: 'uq_schedule_doctor_hospital_date' });
  });
  await knex.raw(`CREATE INDEX idx_schedule_hospital ON doctor_schedules(hospital_id)`);

  // ── slots ─────────────────────────────────────────────────────────
  await knex.schema.createTable('slots', (t) => {
    t.increments('id').primary();
    t.integer('schedule_id').unsigned().notNullable()
      .references('id').inTable('doctor_schedules').onDelete('CASCADE');
    t.time('start_time').notNullable();
    t.time('end_time').notNullable();
    t.integer('max_patients').notNullable().defaultTo(1);
    t.integer('current_patients').notNullable().defaultTo(0);
    t.boolean('is_locked').notNullable().defaultTo(false);
  });
  await knex.raw(`CREATE INDEX idx_slot_schedule ON slots(schedule_id)`);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('slots');
  await knex.schema.dropTableIfExists('doctor_schedules');
};
