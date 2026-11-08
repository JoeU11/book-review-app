import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
// import * as user_model from './model.mjs';
import { DatabaseSync } from 'node:sqlite';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

const db = new DatabaseSync('app.db');
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)');
db.prepare('INSERT INTO users (id, name) VALUES (?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Alice');

const findUser = db.prepare('SELECT id, name FROM users WHERE id = ?');

// testing
async function handleGetUser(request, response) {
  console.log(request.params.id)
  const user = findUser.get(request.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  response.json(user)
}
//end

app.get("/test/:id", asyncHandler(handleGetUser))

app.listen(PORT, async () => {
  // await exercises.connect(false)
  console.log(`Server listening on port ${PORT}...`);
});
