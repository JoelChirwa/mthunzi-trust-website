import mongoose from 'mongoose'

const VerificationCodeSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    index: true,
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true, 
    index: true 
  },
  code: { 
    type: String, 
    required: true 
  },
  attempts: { 
    type: Number, 
    default: 0 
  },
  expiresAt: { 
    type: Date, 
    required: true, 
    index: true 
  },
  createdAt: { 
    type: Date, 
    default: () => new Date() 
  }
})

const VerificationCode = mongoose.models.VerificationCode || mongoose.model('VerificationCode', VerificationCodeSchema)
export default VerificationCode
