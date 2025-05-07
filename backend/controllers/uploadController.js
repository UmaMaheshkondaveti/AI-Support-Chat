import Document from '../models/Document.js';
import pdfParse from 'pdf-parse';

export const handleFileUpload = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    let content = '';

    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      content = data.text;
    } else if (mimetype === 'text/plain') {
      content = buffer.toString();
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    const doc = await Document.create({ originalname, filename: req.file.filename, mimetype, content });
    res.status(201).json({ message: 'File uploaded', docId: doc._id });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};
