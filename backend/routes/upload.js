import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { saveDocument } from '../models/UploadedDocument.js';

// Configure storage to keep original filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use timestamp to avoid filename conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let content = '';

    if (file.mimetype === 'application/pdf') {
      try {
        // Import pdf-parse dynamically to handle potential initialization errors
        const pdfParse = (await import('pdf-parse')).default;
        const dataBuffer = fs.readFileSync(file.path);
        const data = await pdfParse(dataBuffer);
        content = data.text;
      } catch (pdfError) {
        console.error('Error parsing PDF:', pdfError);
        return res.status(500).json({ 
          error: 'Error processing PDF file', 
          details: pdfError.message 
        });
      }
    } else if (file.mimetype === 'text/plain' || 
               file.mimetype === 'text/csv' || 
               file.mimetype === 'application/json') {
      content = fs.readFileSync(file.path, 'utf-8');
    } else {
      // For other file types, just note that content extraction isn't supported
      content = `[Content extraction not supported for ${file.mimetype}]`;
    }

    // Add metadata about the file
    const documentData = {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      content,
      uploadDate: new Date()
    };

    await saveDocument(documentData);
    
    return res.status(200).json({ 
      message: 'File uploaded and processed successfully',
      file: {
        name: file.originalname,
        type: file.mimetype,
        size: file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Server error processing upload', 
      details: error.message 
    });
  }
});

// Get all uploaded documents
router.get('/', async (req, res) => {
  try {
    // This requires implementing a getDocuments function in your model
    // const documents = await getDocuments();
    // res.json(documents);
    
    // Placeholder until you implement document retrieval
    res.json({ message: 'Document retrieval not yet implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;