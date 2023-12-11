// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Create a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
