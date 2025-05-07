import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get model (with error handling)
const getModel = () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    // Using Gemini Pro for text-only inputs
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  } catch (error) {
    console.error('Error initializing Gemini model:', error);
    throw error;
  }
};

// Basic chat endpoint
router.post('/prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    console.log('Received prompt:', prompt);
    
    const model = getModel();
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('Generated response:', text.substring(0, 100) + '...');
    
    return res.json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response', 
      details: error.message 
    });
  }
});

// Chat with context from uploaded documents
router.post('/document-chat', async (req, res) => {
  try {
    const { prompt, documentId } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    // You'll need to implement this function to fetch document by ID
    // const document = await getDocumentById(documentId);
    
    // For now, using a placeholder
    let documentContext = '';
    if (documentId) {
      // Implement document retrieval here
      documentContext = `[Content from document ${documentId}]`;
    }
    
    // Combine document context with user prompt
    const fullPrompt = documentContext 
      ? `Context from document:\n${documentContext}\n\nUser query: ${prompt}`
      : prompt;
    
    const model = getModel();
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    
    return res.json({ response: text });
  } catch (error) {
    console.error('Error in document chat:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response with document context', 
      details: error.message 
    });
  }
});

// History-based chat endpoint
router.post('/chat-session', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    const model = getModel();
    const chat = model.startChat();
    
    let response;
    // Process each message in the history
    for (const message of messages) {
      response = await chat.sendMessage(message.content);
    }
    
    if (!response) {
      throw new Error('Failed to generate response');
    }
    
    const text = response.text();
    return res.json({ response: text });
  } catch (error) {
    console.error('Error in chat session:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat session', 
      details: error.message 
    });
  }
});

export default router;