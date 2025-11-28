import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  type: { type: String },
  description: { type: String },
  requirements: { type: String },
  applyUrl: { type: String },
  applyEmail: { type: String },
  isActive: { type: Boolean, default: true },
  postedAt: { type: Date, default: Date.now },
  deadline: { type: Date }
}, { timestamps: true })

const Job = mongoose.model('Job', JobSchema)
export default Job
