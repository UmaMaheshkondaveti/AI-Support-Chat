import Chat from '../models/Chat.js';
import Document from '../models/Document.js';
import { getGeminiResponse } from '../services/geminiService.js';

export const handleUserMessage = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const documents = await Document.find({});
    const matchedContent = documents
      .filter(doc => doc.content.toLowerCase().includes(message.toLowerCase()))
      .map(doc => doc.content)
      .slice(0, 3)
      .join('\n\n');

    const prompt = `Context:\n${matchedContent}\n\nQuestion: ${message}`;
    const aiResponse = await getGeminiResponse(prompt);

    await Chat.create({ userId, sender: 'user', text: message });
    await Chat.create({ userId, sender: 'ai', text: aiResponse });

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
