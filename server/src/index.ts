import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/knex';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'VitaFamily API is running' });
});

app.get('/health/db', async (_req, res) => {
  try {
    await db.raw('SELECT 1+1 AS result');
    res.json({ success: true, message: 'Kết nối Supabase thành công' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, message: 'Kết nối thất bại', error: message });
  }
});

// Routes — thêm vào đây
// import authRoutes from './routes/auth';
// app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Kết nối Supabase PostgreSQL thành công');
  } catch (err) {
    console.error('❌ Kết nối Supabase thất bại:', err);
  }
});
