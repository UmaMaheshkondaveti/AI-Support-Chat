import express from 'express';
const router = express.Router();

// Sample admin dashboard route
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Sample admin login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy check (replace with real logic)
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, token: 'dummy-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

export default router;
