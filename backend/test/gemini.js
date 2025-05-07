import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key (first few chars):', apiKey ? apiKey.substring(0, 5) + '...' : 'NOT FOUND');

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    console.log('Sending test prompt to Gemini...');
    const result = await model.generateContent('Hello, please respond with a simple greeting.');
    const response = result.response;
    console.log('Response from Gemini:', response.text());
    console.log('Test successful!');
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
  }
}

testGemini();