import dotenv from 'dotenv';
import { connectDB } from '../server/config/db.js';
import Admin from '../server/models/admin.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();

function parseArg(name) {
  const arg = process.argv.find(a => a.startsWith(name + '='));
  if (!arg) return undefined;
  return arg.split('=')[1];
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || parseArg('--email') || 'chirwajj@gmail.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || parseArg('--password') || process.env.MASTER_PASSWORD;

  if (!password) {
    console.error('No password provided. Set ADMIN_PASSWORD env or pass --password or set MASTER_PASSWORD in .env');
    process.exit(1);
  }

  await connectDB();

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const admin = new Admin({ email, passwordHash });
  await admin.save();

  console.log('Admin created:', email);
  process.exit(0);
}

main().catch(err => {
  console.error('Error creating admin:', err && err.message);
  process.exit(1);
});
