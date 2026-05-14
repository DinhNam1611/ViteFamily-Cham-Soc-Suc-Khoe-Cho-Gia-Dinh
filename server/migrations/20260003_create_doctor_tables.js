/**
 * Migration 3: Doctor profile + relationship tables
 * Tables: doctors, doctor_specialties, doctor_hospitals
 */

exports.up = async function (knex) {
  // ── doctors ───────────────────────────────────────────────────────
  await knex.schema.createTable('doctors', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    t.string('full_name', 100).notNullable();
    t.string('slug', 120).notNullable().unique();
    t.string('qualifications', 200).nullable().defaultTo(null);
    t.text('bio').nullable();
    t.string('sub_specialty', 150).nullable().defaultTo(null);
    t.integer('experience').notNullable().defaultTo(0);
    t.decimal('consultation_fee', 10, 2).notNullable().defaultTo(200000);
    t.decimal('rating', 2, 1).notNullable().defaultTo(5.0);
    t.integer('review_count').notNullable().defaultTo(0);
    t.string('avatar', 500).nullable().defaultTo(null);
    t.jsonb('languages').nullable();
    t.jsonb('education').nullable();
    t.jsonb('certifications').nullable();
    t.jsonb('work_experience').nullable();
    t.jsonb('memberships').nullable();
    t.jsonb('special_interests').nullable();
    t.string('approval_status', 10).notNullable().defaultTo('pending');
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE doctors ADD CONSTRAINT chk_doctor_approval CHECK (approval_status IN ('pending','approved','rejected'))`);
  await knex.raw(`ALTER TABLE doctors ADD CONSTRAINT chk_doctor_rating    CHECK (rating BETWEEN 1.0 AND 5.0)`);
  await knex.raw(`CREATE INDEX idx_doctor_approval ON doctors(approval_status)`);
  await knex.raw(`
    CREATE TRIGGER trg_doctors_updated_at
    BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);

  // ── doctor_specialties ────────────────────────────────────────────
  await knex.schema.createTable('doctor_specialties', (t) => {
    t.integer('doctor_id').unsigned().notNullable()
      .references('id').inTable('doctors').onDelete('CASCADE');
    t.integer('specialty_id').unsigned().notNullable()
      .references('id').inTable('specialties').onDelete('CASCADE');
    t.boolean('is_primary').notNullable().defaultTo(true);
    t.primary(['doctor_id', 'specialty_id']);
  });

  // ── doctor_hospitals ──────────────────────────────────────────────
  await knex.schema.createTable('doctor_hospitals', (t) => {
    t.integer('doctor_id').unsigned().notNullable()
      .references('id').inTable('doctors').onDelete('CASCADE');
    t.integer('hospital_id').unsigned().notNullable()
      .references('id').inTable('hospitals').onDelete('CASCADE');
    t.primary(['doctor_id', 'hospital_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('doctor_hospitals');
  await knex.schema.dropTableIfExists('doctor_specialties');
  await knex.schema.dropTableIfExists('doctors');
};
