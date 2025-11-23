import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import adminRoutes from './server/routes/admin.js';
import blogsRoutes from './server/routes/blogs.js';
import teamRoutes from './server/routes/team.js';
import partnersRoutes from './server/routes/partners.js';

import { connectDB } from './server/config/db.js';
import mail from './server/utils/mail.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

// -------------------- Middleware --------------------
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// -------------------- CORS --------------------
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = CLIENT_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'));
  },
  credentials: true,
}));

// -------------------- API Routes --------------------
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/posts', blogsRoutes); // backward compatibility
app.use('/api/team', teamRoutes);
app.use('/api/partners', partnersRoutes);

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true }));

// Status check
app.get('/api/status', async (_, res) => {
  const status = { db: { connected: false }, mail: { ok: false } };

  try {
    await connectDB();
    status.db.connected = true;
  } catch (e) {
    status.db.error = e.message;
  }

  try {
    const mailStatus = await mail.verifyTransport();
    status.mail = mailStatus || { ok: false };
  } catch (e) {
    status.mail = { ok: false, error: e.message };
  }

  res.json(status);
});

// -------------------- FRONTEND SERVING (Production Only) --------------------
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "client", "dist");
  const indexPath = path.join(clientDistPath, "index.html");

  console.log("Running in PRODUCTION mode");
  console.log("Serving static frontend from:", clientDistPath);

  if (!fs.existsSync(indexPath)) {
    console.error("❌ ERROR: Frontend build not found! Run 'npm run build' in client/");
  }

  // Serve static files
  app.use(express.static(clientDistPath));

  // SPA catch-all
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  console.log("Running in DEVELOPMENT mode – Frontend not served by server");
}

// -------------------- Server Startup --------------------
(async () => {
  try {
    await connectDB();
    console.log('[startup] MongoDB connected');
  } catch (e) {
    console.warn('[startup] MongoDB connection failed:', e.message);
  }

  try {
    const mailStatus = await mail.verifyTransport();
    if (mailStatus?.ok) console.log('[startup] Mailer verified');
    else console.warn('[startup] Mailer failed:', mailStatus?.error || 'Unknown');
  } catch (e) {
    console.warn('[startup] Mailer error:', e.message);
  }

  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );
})();
