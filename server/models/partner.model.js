import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  website: { 
    type: String, 
    default: '' 
  },
  logo: { 
    type: String, 
    default: '' 
  },
  description: { 
    type: String, 
    default: '' 
  },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
  
const Partner = mongoose.model("Partner", partnerSchema);

export default Partner;

