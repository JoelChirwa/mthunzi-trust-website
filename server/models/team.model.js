import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: '' 
  },
  bio: { 
    type: String, 
    default: '' 
  },
  photo: { 
    type: String, 
    default: '' 
  },
}, {
  timestamps: true, // createdAt, updatedAt
}
);
  
const Team = mongoose.model("Team", teamSchema);

export default Team;