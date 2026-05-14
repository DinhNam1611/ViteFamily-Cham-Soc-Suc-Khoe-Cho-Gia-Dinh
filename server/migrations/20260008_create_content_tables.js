/**
 * Migration 8: Content + chat tables
 * Tables: chat_sessions, chat_messages, articles, hero_banners
 */

exports.up = async function (knex) {
  // ── chat_sessions ─────────────────────────────────────────────────
  await knex.schema.createTable('chat_sessions', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    t.string('title', 200).nullable().defaultTo(null);
    t.timestamp('start_time', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('end_time', { useTz: false }).nullable().defaultTo(null);
  });
  await knex.raw(`CREATE INDEX idx_chat_user ON chat_sessions(user_id)`);

  // ── chat_messages ─────────────────────────────────────────────────
  await knex.schema.createTable('chat_messages', (t) => {
    t.increments('id').primary();
    t.integer('session_id').unsigned().notNullable()
      .references('id').inTable('chat_sessions').onDelete('CASCADE');
    t.string('sender_role', 5).notNullable();
    t.text('content').notNullable();
    t.timestamp('timestamp', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`ALTER TABLE chat_messages ADD CONSTRAINT chk_msg_sender CHECK (sender_role IN ('user','ai'))`);
  await knex.raw(`CREATE INDEX idx_msg_session ON chat_messages(session_id)`);

  // ── articles ──────────────────────────────────────────────────────
  await knex.schema.createTable('articles', (t) => {
    t.increments('id').primary();
    t.string('title', 250).notNullable();
    t.string('slug', 250).notNullable().unique();
    t.string('category', 80).notNullable();
    t.text('summary').nullable();
    t.text('content').nullable();
    t.string('thumbnail', 500).nullable().defaultTo(null);
    t.integer('author_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('users').onDelete('SET NULL');
    t.date('published_at').nullable().defaultTo(null);
    t.boolean('is_published').notNullable().defaultTo(false);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_article_category  ON articles(category)`);
  await knex.raw(`CREATE INDEX idx_article_published ON articles(is_published)`);
  await knex.raw(`CREATE INDEX idx_article_date      ON articles(published_at)`);
  await knex.raw(`
    CREATE TRIGGER trg_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);

  // ── hero_banners ──────────────────────────────────────────────────
  await knex.schema.createTable('hero_banners', (t) => {
    t.increments('id').primary();
    t.string('title', 200).notNullable();
    t.text('subtitle').nullable();
    t.string('image_url', 500).notNullable();
    t.string('cta_primary', 100).nullable().defaultTo(null);
    t.string('cta_secondary', 100).nullable().defaultTo(null);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.boolean('is_active').notNullable().defaultTo(true);
    t.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`CREATE INDEX idx_banner_active ON hero_banners(is_active)`);
  await knex.raw(`CREATE INDEX idx_banner_sort   ON hero_banners(sort_order)`);
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('hero_banners');
  await knex.schema.dropTableIfExists('articles');
  await knex.schema.dropTableIfExists('chat_messages');
  await knex.schema.dropTableIfExists('chat_sessions');
};
