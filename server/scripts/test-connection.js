/**
 * Chạy để kiểm tra kết nối Supabase:
 *   node scripts/test-connection.js
 */
require('dotenv').config();
const { Client } = require('pg');

// Dùng pg Client trực tiếp để test, tránh vấn đề IPv6 của knex pool
async function testWithPg() {
  const client = new Client({
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl:      { rejectUnauthorized: false },
  });
  await client.connect();
  const res = await client.query('SELECT 1+1 AS result');
  await client.end();
  return res.rows[0].result;
}

const knex = require('knex')(require('../knexfile'));

async function main() {
  console.log('\n🔍 Đang kết nối Supabase...');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT}`);
  console.log(`   DB:   ${process.env.DB_NAME}`);
  console.log(`   SSL:  ${process.env.DB_SSL}`);

  try {
    await knex.raw('SELECT 1+1 AS result');
    console.log('\n✅ Kết nối thành công!\n');

    // Kiểm tra migration status
    const migrated = await knex.migrate.status();
    console.log(`📋 Migration status: ${JSON.stringify(migrated)}`);
  } catch (err) {
    console.error('\n❌ Kết nối thất bại:', err.message, '\n');
    console.error('Kiểm tra lại .env:\n  - DB_HOST đúng chưa?\n  - DB_PASSWORD đúng chưa?\n  - DB_SSL=true?\n');
    process.exit(1);
  } finally {
    await knex.destroy();
  }
}

main();
