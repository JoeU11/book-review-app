import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
// import * as user_model from './model.mjs';
import { DatabaseSync } from 'node:sqlite';
import cors from 'cors'
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT;

const db = new DatabaseSync('app.db');
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL)');
db.exec('CREATE TABLE IF NOT EXISTS authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL)');
db.exec('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author INT REFERENCES authors(id), image_url TEXT)')
db.prepare('INSERT INTO users (id, name, password) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Alice', "1234");
db.prepare('INSERT INTO authors (id, name) VALUES (?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Brandon Sanderson');
db.prepare('INSERT INTO authors (id, name) VALUES (?, ?) ON CONFLICT(id) DO NOTHING').run(2, 'Pierce Brown');
db.prepare('INSERT INTO books (id, title, author, image_url) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').run(1, 'Mistborn', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjLXgmZQXzvUPzbTxS1hvc-U-h_7-O9KD8CSNKsfd1TEcXuu92Hvv9CIjRaSVrGimGemkjS__rpkIoy1J9fW6TWliJcofIoYoBBzHD-8OrA&s=10');
db.prepare('INSERT INTO books (id, title, author, image_url) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').run(2, 'Warbreaker', 1, 'https://thumb.wikimedia.org/wikipedia/en/thumb/a/a7/Warbreaker_cover.jpg/250px-Warbreaker_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail');
db.prepare('INSERT INTO books (id, title, author, image_url) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').run(3, 'Red Rising', 2, 'https://thumb.wikimedia.org/wikipedia/en/thumb/9/9b/Red_Rising_%282014%29.jpg/250px-Red_Rising_%282014%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail');
db.prepare('INSERT INTO books (id, title, author, image_url) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').run(4, 'Oathbringer', 1, 'https://uploads.coppermind.net/thumb/Oathbringer_US_Hardcover.jpg/1200px-Oathbringer_US_Hardcover.jpg');

const findUser = db.prepare('SELECT id, name, password FROM users WHERE name = ?');
const getBooks = db.prepare('SELECT books.id, books.title, books.author, authors.name, books.image_url FROM books INNER JOIN authors ON books.author = authors.id');

// async function handleGetUser(request, response) {
//   const user = findUser.get(request.params.id)
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }
//   response.json(user)
// }

async function login(request, response) {
  const { name, password } = request.body;

  const user = findUser.get(name)

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  const validPassword = user.password === password;

  if (!validPassword) {
    return response.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '2h'
    }
  );

  response.json({ token });
}

// Get Books
async function handleGetBooks(request, response) {
  const books = getBooks.all();
  response.json(books)
}

// app.get("/test/:id", asyncHandler(handleGetUser))
app.get("/books", asyncHandler(handleGetBooks))
app.post("/login", asyncHandler(login))

app.listen(PORT, async () => {
  // await exercises.connect(false)
  console.log(`Server listening on port ${PORT}...`);
});
