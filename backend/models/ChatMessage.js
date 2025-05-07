const connectToMongoDB = require('../config/db');

async function saveMessage(userId, sender, text) {
  const db = await connectToMongoDB();
  return db.collection('chatMessages').insertOne({ userId, sender, text, timestamp: new Date() });
}

async function getChatHistory(userId) {
  const db = await connectToMongoDB();
  return db.collection('chatMessages').find({ userId }).sort({ timestamp: 1 }).toArray();
}

module.exports = { saveMessage, getChatHistory };