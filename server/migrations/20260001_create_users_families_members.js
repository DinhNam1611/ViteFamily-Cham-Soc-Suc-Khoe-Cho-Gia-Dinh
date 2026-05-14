/**
 * Migration 1: Core user tables + updated_at trigger function
 * Tables: users, families, members
 */

exports.up = async function (knex) {
  // Trigger function for auto-updating updated_at — created once, reused by all tables
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // ── users ─────────────────────────────────────────────────────────
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('email', 150).notNullable().unique();
    t.string('password', 255).notNullable();
    t.string('full_name', 100).notNullable();
    t.string('phone', 15).nullable().defaultTo(null);
    t.string('avatar', 500).nullable().defaultTo(null);
    t.date('dob').nullable().defaultTo(null);
    t.string('address', 300).nullable().defaultTo(null);
    t.string('role', 10).notNullable().defaultTo('user');
    t.string('status', 10).notNullable().defaultTo('active');
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE users ADD CONSTRAINT chk_users_role   CHECK (role   IN ('user','doctor','admin'))`);
  await knex.raw(`ALTER TABLE users ADD CONSTRAINT chk_users_status CHECK (status IN ('active','locked'))`);
  await knex.raw(`CREATE INDEX idx_users_role   ON users(role)`);
  await knex.raw(`CREATE INDEX idx_users_status ON users(status)`);
  await knex.raw(`
    CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);

  // ── families ──────────────────────────────────────────────────────
  await knex.schema.createTable('families', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    t.string('family_name', 100).notNullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });

  // ── members ───────────────────────────────────────────────────────
  await knex.schema.createTable('members', (t) => {
    t.increments('id').primary();
    t.integer('family_id').unsigned().notNullable()
      .references('id').inTable('families').onDelete('CASCADE');
    t.string('full_name', 100).notNullable();
    t.date('dob').notNullable();
    t.string('gender', 10).notNullable();
    t.string('blood_type', 5).nullable().defaultTo(null);
    t.text('allergy').nullable();
    t.text('medical_history').nullable();
    t.string('relationship', 50).notNullable();
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE members ADD CONSTRAINT chk_members_gender CHECK (gender IN ('male','female','other'))`);
  await knex.raw(`CREATE INDEX idx_members_family ON members(family_id)`);
  await knex.raw(`
    CREATE TRIGGER trg_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('members');
  await knex.schema.dropTableIfExists('families');
  await knex.schema.dropTableIfExists('users');
  await knex.raw(`DROP FUNCTION IF EXISTS update_updated_at_column CASCADE`);
};
