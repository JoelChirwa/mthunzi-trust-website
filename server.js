import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './server/routes/auth.route.js';
import blogRoutes from './server/routes/blog.route.js';
import contactRoutes from './server/routes/contact.route.js';
import eventRoutes from './server/routes/event.route.js';
import jobRoutes from './server/routes/job.route.js';
import newsletterRoutes from './server/routes/newsletter.route.js';
import partnerRoutes from './server/routes/partner.route.js';
import uploadRoutes from './server/routes/upload.route.js';
import connectDB from './server/config/db.js';
import mailTransporter from './server/utils/emailService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        console.log(`[req] ${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - start}ms`);
    });
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/status', (req, res) => res.json({ status: 'ok' }));


const clientBuildPath = path.join(__dirname, 'client', 'build');

if (fs.existsSync(clientBuildPath)) {
    console.log('Frontend build found → serving from:', clientBuildPath);


    app.use(express.static(clientBuildPath));


    app.use((req, res, next) => {
        // Only handle GET and HEAD here (let other methods fall through)
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        if (req.originalUrl.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });

} else {
    console.log('ERROR: client/build folder not found!');
    console.log('Run: npm run build');
    process.exit(1);
}

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

(async () => {
    try { await connectDB(); console.log('[startup] MongoDB connected'); } catch (e) { console.warn('DB failed'); }
    try { await mailTransporter.verify(); console.log('[startup] Mailer verified'); } catch (e) { console.warn('Mailer failed'); }

    app.listen(PORT, () => {
        console.log(`Server running → http://localhost:${PORT}`);
    });
})();