/**
 * Migration 7: Reviews and notification tables
 * Tables: appointment_reviews, notifications, system_notifications
 */

exports.up = async function (knex) {
  // ── appointment_reviews ───────────────────────────────────────────
  await knex.schema.createTable('appointment_reviews', (t) => {
    t.increments('id').primary();
    t.integer('appointment_id').unsigned().notNullable().unique()
      .references('id').inTable('appointments').onDelete('CASCADE');
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    t.integer('doctor_id').unsigned().notNullable()
      .references('id').inTable('doctors').onDelete('CASCADE');
    t.integer('rating').notNullable();
    t.text('comment').nullable();
    t.boolean('is_visible').notNullable().defaultTo(true);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE appointment_reviews ADD CONSTRAINT chk_review_rating CHECK (rating BETWEEN 1 AND 5)`);
  await knex.raw(`CREATE INDEX idx_review_doctor ON appointment_reviews(doctor_id)`);

  // ── notifications ─────────────────────────────────────────────────
  await knex.schema.createTable('notifications', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    t.string('title', 200).notNullable();
    t.text('content').nullable();
    t.string('type', 15).notNullable();
    t.integer('related_id').unsigned().nullable().defaultTo(null);
    t.boolean('is_read').notNullable().defaultTo(false);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE notifications ADD CONSTRAINT chk_notif_type CHECK (type IN ('medicine','appointment','payment','system'))`);
  await knex.raw(`CREATE INDEX idx_notif_user    ON notifications(user_id)`);
  await knex.raw(`CREATE INDEX idx_notif_read    ON notifications(is_read)`);
  await knex.raw(`CREATE INDEX idx_notif_created ON notifications(created_at)`);

  // ── system_notifications ──────────────────────────────────────────
  await knex.schema.createTable('system_notifications', (t) => {
    t.increments('id').primary();
    t.string('title', 200).notNullable();
    t.text('content').notNullable();
    t.string('target_group', 10).notNullable().defaultTo('all');
    t.timestamp('scheduled_at', { useTz: false }).nullable().defaultTo(null);
    t.timestamp('sent_at', { useTz: false }).nullable().defaultTo(null);
    t.string('status', 12).notNullable().defaultTo('draft');
    t.integer('created_by').unsigned().nullable().defaultTo(null)
      .references('id').inTable('users').onDelete('SET NULL');
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE system_notifications ADD CONSTRAINT chk_sysnotif_group  CHECK (target_group IN ('all','doctor','user'))`);
  await knex.raw(`ALTER TABLE system_notifications ADD CONSTRAINT chk_sysnotif_status CHECK (status       IN ('draft','scheduled','sent'))`);
  await knex.raw(`CREATE INDEX idx_sysnotif_status ON system_notifications(status)`);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('system_notifications');
  await knex.schema.dropTableIfExists('notifications');
  await knex.schema.dropTableIfExists('appointment_reviews');
};
