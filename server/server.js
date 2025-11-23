import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import { connectDB } from "./config/db.js";

import blogRoutes from "./routes/blog.route.js";
import teamRoutes from "./routes/team.route.js";
import partnerRoutes from "./routes/partner.route.js";
import adminRoutes from "./routes/admin.route.js";
import contactRoutes from "./routes/contact.route.js";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

// Simple CORS middleware to allow the dev frontend (Vite) to fetch the API
// CORS: echo the request origin and allow cookies for credentialed requests
app.use((req, res, next) => {
	const origin = req.headers.origin || '*';
	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
		return res.sendStatus(200);
	}
	next();
});

app.use("/api/blogs", blogRoutes);
// Use singular base paths to match client expectations (client calls /api/team)
app.use("/api/team", teamRoutes);
app.use("/api/partners", partnerRoutes);
// Mount admin routes at /api/admin so client calls like /api/admin/session work
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Ensure uploads directory exists and serve it statically at /uploads
const uploadsPath = path.resolve(process.cwd(), 'uploads')
try {
	if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true })
} catch (e) {
	console.warn('Could not create uploads directory:', e && e.message)
}
app.use('/uploads', express.static(uploadsPath))

// API route for handling file uploads from the client
app.use('/api/uploads', uploadRoutes)


if (process.env.NODE_ENV === "production") {
	const clientDistPath = path.join(__dirname, "client", "dist");
	const indexPath = path.resolve(__dirname, "client", "dist", "index.html");
	console.log("NODE_ENV=", process.env.NODE_ENV);
	console.log("Serving static from:", clientDistPath, "index exists:", fs.existsSync(indexPath));

	app.use(express.static(clientDistPath));
	// Serve client index.html for any non-API route so the SPA can handle routing
	app.get(/.*/, (req, res) => {
		res.sendFile(indexPath);
	});
}

app.listen(PORT, '0.0.0.0', () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});