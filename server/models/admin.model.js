import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], required: true, default: 'admin' },
    profileImage: { type: String },
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
