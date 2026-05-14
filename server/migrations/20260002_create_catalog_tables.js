/**
 * Migration 2: Catalog / master data tables
 * Tables: specialties, hospitals, services, service_packages
 */

exports.up = async function (knex) {
  // ── specialties ───────────────────────────────────────────────────
  await knex.schema.createTable('specialties', (t) => {
    t.increments('id').primary();
    t.string('name', 100).notNullable();
    t.string('slug', 120).notNullable().unique();
    t.string('icon', 80).notNullable();
    t.string('group', 20).notNullable();
    t.string('group_label', 60).notNullable();
    t.text('description').nullable();
    t.jsonb('common_diseases').nullable();
    t.jsonb('staff_types').nullable();
    t.integer('doctor_count').notNullable().defaultTo(0);
    t.boolean('is_active').notNullable().defaultTo(true);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE specialties ADD CONSTRAINT chk_spec_group CHECK ("group" IN ('internal','surgical','support'))`);
  await knex.raw(`CREATE INDEX idx_specialty_group  ON specialties("group")`);
  await knex.raw(`CREATE INDEX idx_specialty_active ON specialties(is_active)`);

  // ── hospitals ─────────────────────────────────────────────────────
  await knex.schema.createTable('hospitals', (t) => {
    t.increments('id').primary();
    t.string('name', 150).notNullable();
    t.string('address', 300).notNullable();
    t.string('city', 100).notNullable().defaultTo('TP. Hồ Chí Minh');
    t.string('phone', 20).notNullable();
    t.string('email', 150).nullable().defaultTo(null);
    t.string('working_hours', 100).nullable().defaultTo(null);
    t.text('description').nullable();
    t.string('image_url', 500).nullable().defaultTo(null);
    t.string('bank_account', 50).nullable().defaultTo(null);
    t.string('bank_name', 100).nullable().defaultTo(null);
    t.boolean('is_active').notNullable().defaultTo(true);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_hospital_active ON hospitals(is_active)`);
  await knex.raw(`CREATE INDEX idx_hospital_city   ON hospitals(city)`);

  // ── services ──────────────────────────────────────────────────────
  await knex.schema.createTable('services', (t) => {
    t.increments('id').primary();
    t.string('name', 100).notNullable();
    t.string('icon', 80).notNullable();
    t.text('description').nullable();
    t.string('slug', 120).notNullable().unique();
    t.integer('sort_order').notNullable().defaultTo(0);
    t.boolean('is_active').notNullable().defaultTo(true);
  });

  // ── service_packages ──────────────────────────────────────────────
  await knex.schema.createTable('service_packages', (t) => {
    t.increments('id').primary();
    t.string('name', 150).notNullable();
    t.string('category', 100).notNullable();
    t.string('slug', 150).notNullable().unique();
    t.string('image', 500).nullable().defaultTo(null);
    t.text('description').nullable();
    t.jsonb('features').nullable();
    t.string('target_audience', 200).nullable().defaultTo(null);
    t.boolean('is_active').notNullable().defaultTo(true);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_pkg_category ON service_packages(category)`);
  await knex.raw(`CREATE INDEX idx_pkg_active   ON service_packages(is_active)`);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('service_packages');
  await knex.schema.dropTableIfExists('services');
  await knex.schema.dropTableIfExists('hospitals');
  await knex.schema.dropTableIfExists('specialties');
};
