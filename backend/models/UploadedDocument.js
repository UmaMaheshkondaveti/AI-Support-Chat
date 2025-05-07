import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  originalname: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

// Create model or use existing one
const DocumentModel = mongoose.models.Document || mongoose.model('Document', documentSchema);

// Save document to database
export const saveDocument = async (documentData) => {
  try {
    const document = new DocumentModel(documentData);
    return await document.save();
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

// Get all documents
export const getDocuments = async () => {
  try {
    return await DocumentModel.find({})
      .select('-content') // Exclude the content field to avoid large responses
      .sort({ uploadDate: -1 });
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Get document by ID
export const getDocumentById = async (id) => {
  try {
    return await DocumentModel.findById(id);
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export default DocumentModel;