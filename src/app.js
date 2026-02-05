const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Home page
app.get('/', (req, res) => {
  res.send(`
    <h1>Node.js CI/CD Application</h1>
    <p>API Endpoints:</p>
    <ul>
      <li><a href="/health">GET /health</a> - Health check</li>
      <li><a href="/api/users">GET /api/users</a> - Get users</li>
      <li>POST /api/users - Create user</li>
    </ul>
  `);
});

// API routes
app.get('/api/users', (req, res) => {
  res.json({ users: [], message: 'Users endpoint working' });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  res.status(201).json({ id: 1, name, email, created: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling
app.use((err, req, res) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;