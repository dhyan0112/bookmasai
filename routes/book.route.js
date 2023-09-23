const express = require('express');
const { BookModel } = require('../models/book.model');
const bookRouter = express.Router();
// Add Book API
bookRouter.post('/add', async (req, res) => {
  const payload=req.body;
    const book=new BookModel(payload)
    await book.save()
    res.send({"msg":"New book is added"})
});

// Retrieve Books API
bookRouter.get('/allbooks', async (req, res) => {
  const books=await BookModel.find();
    res.send(books)
});

// Delete Book API
bookRouter.delete('/delete/:id', async (req, res) => {
  const bookid=req.params.id
    await BookModel.findByIdAndDelete({_id:bookid})
    res.send({"msg":`Book with ID:${book} has been deleted.`})
});

// Filter Books API
bookRouter.get('/filter/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const filteredBooks = await BookModel.find({ genre });
    res.json(filteredBooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to filter books by genre.' });
  }
});

// Sort Books API
bookRouter.get('/sort/:field', async (req, res) => {
  try {
    const field = req.params.field;
    const sortedBooks = await BookModel.find().sort({ [field]: 1 });
    res.json(sortedBooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to sort books.' });
  }
});

module.exports = {
    bookRouter
};
