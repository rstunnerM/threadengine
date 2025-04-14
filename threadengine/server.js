// ThreadEngine Core Server 🚀
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5500;

// ESM-safe __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🛡️ Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🗂️ Static File Hosting (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// 📡 Basic API Route
app.get('/api/ping', (req, res) => {
  res.json({ status: '✅ ThreadEngine API is live!' });
});

// 📁 Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🚀 Launch Server
app.listen(PORT, () => {
  console.log(`🌐 ThreadEngine running at: http://localhost:${PORT}`);
});
