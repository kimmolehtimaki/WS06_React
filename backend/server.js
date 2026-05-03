const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Commented out since while starting the server route was not found 
//const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// ─── COMPLETED: Write the connectToDatabase function ──────────────────────────────
// This function shall:
//   1. Check if process.env.MONGODB_URI exists
//      - If missing, warn the user and return early
//   2. Use a try-catch block to safely connect to MongoDB with mongoose.connect()
//      - Pass options: { dbName: 'blog' }
//      - Log success: "Connected to MongoDB"
//      - Log error: "MongoDB connection error: <error.message>"
//   3. Return a Promise (async/await)

async function connectToDatabase() {
  // Connecting to database
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is missing. Assure URI listed in .env file before testing database.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'blog' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error', error.message);
  }

}

app.locals.publicDir = publicDir;
app.use(express.json());
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/posts', postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Server error' });
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Mounted routers:');
    console.log('  / -> routes/pages.js');
    console.log('  /api/posts -> routes/posts.js');
  });
});
