import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
// import * as user_model from './model.mjs';
import { DatabaseSync } from 'node:sqlite';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT;

const db = new DatabaseSync('app.db');
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)');
db.exec('CREATE TABLE IF NOT EXISTS authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL)');
db.exec('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author INT REFERENCES authors(id), image_name TEXT)')
db.prepare('INSERT INTO users (id, name) VALUES (?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Alice');
db.prepare('INSERT INTO authors (id, name) VALUES (?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Brandon Sanderson');
db.prepare('INSERT INTO books (id, title, author, image_name) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Mistborn', 1, 'mistborn.avif');

const findUser = db.prepare('SELECT id, name FROM users WHERE id = ?');
const getBooks = db.prepare('SELECT books.id, books.title, books.author, authors.name, books.image_name FROM books INNER JOIN authors ON books.author = authors.id');

// testing
async function handleGetUser(request, response) {
  const user = findUser.get(request.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  response.json(user)
}
//end

// Get Books
async function handleGetBooks(request, response) {
  const books = getBooks.get();
  response.json(books)
}

app.get("/test/:id", asyncHandler(handleGetUser))
app.get("/books", asyncHandler(handleGetBooks))

app.listen(PORT, async () => {
  // await exercises.connect(false)
  console.log(`Server listening on port ${PORT}...`);
});
