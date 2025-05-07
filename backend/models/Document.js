import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  content: String,
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model('Document', documentSchema);
