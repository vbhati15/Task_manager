require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const PORT = process.env.PORT || 5000;

// Read DB
function readDB() {
  const raw = fs.readFileSync(DB_PATH);
  return JSON.parse(raw);
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// --- Auth routes ---
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// --- Tasks CRUD (protected) ---
app.get('/tasks', authMiddleware, (req, res) => {
  const db = readDB();
  const tasks = db.tasks.filter(t => t.userId === req.user.id);
  res.json(tasks);
});

app.post('/tasks', authMiddleware, (req, res) => {
  const { title, description, category, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const db = readDB();
  const task = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    description: description || '',
    category: category || 'General',
    completed: false,
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  };
  db.tasks.push(task);
  writeDB(db);
  res.status(201).json(task);
});

app.put('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const idx = db.tasks.findIndex(t => t.id === id && t.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const updated = { ...db.tasks[idx], ...req.body };
  db.tasks[idx] = updated;
  writeDB(db);
  res.json(updated);
});

app.delete('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const idx = db.tasks.findIndex(t => t.id === id && t.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  db.tasks.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
