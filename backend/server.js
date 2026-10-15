// Import required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create an express app
const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory data (like a simple database)
let books = [];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST - add a new book
app.post("/books", (req, res) => {
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    status: req.body.status || "Reading",
    link: req.body.link || "#",
  };
  books.push(newBook);
  res.json(newBook);
});

// PUT - update book status
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (book) {
    book.status = req.body.status || book.status;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE - remove a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  books = books.filter((b) => b.id !== id);
  res.json({ message: "Book deleted" });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`📘 Backend running at http://localhost:${PORT}`);
});
