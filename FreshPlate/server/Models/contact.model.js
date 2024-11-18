import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email Address is required'
  },
  message: {
    type: [String],
    required: 'Message is required'
  },
  created: {
    type: Date,
    default: Date.now
  }  
});
export default mongoose.model('Contact', contactSchema);