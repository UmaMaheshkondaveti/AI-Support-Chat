import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: String,
  sender: { type: String, enum: ['user', 'ai'] },
  text: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Chat', chatSchema);
