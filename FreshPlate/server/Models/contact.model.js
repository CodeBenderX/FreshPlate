import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: 'First Name is required'
  },
  lastname: {
    type: [String],
    required: 'Last Name is required'
  },
  email: {
    type: String,
    required: 'Email Address is required'
  },
  created: {
    type: Date,
    default: Date.now
  }  
});
export default mongoose.model('Contact', contactSchema);