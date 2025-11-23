import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true 
    }
    ,
    passwordHash: {
      type: String
    },
    totpSecret: {
      type: String
    },
    is2faEnabled: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // ✅ createdAt and updatedAt will be automatically added
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
