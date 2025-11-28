import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  startsAt: { type: Date },
  endsAt: { type: Date },
  isActive: { type: Boolean, default: true },
  postedAt: { type: Date, default: Date.now }
}, { timestamps: true })

const Event = mongoose.model('Event', EventSchema)
export default Event
