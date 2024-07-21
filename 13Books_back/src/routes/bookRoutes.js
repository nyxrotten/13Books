
const express = require("express");
const router = express.Router();

const {
	showBooks,
    showBookById,
    showBooksByGenre,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');


router.get('/books/:bookId', showBookById);

router.get('/books', showBooks);

router.get('/books/genre/:genre', showBooksByGenre);

router.get('/books/search/:searchtext', searchBooks);

router.post('/books', createBook);

router.put('/books/:bookId', updateBook);

router.delete('/books/:bookId', deleteBook);

module.exports = router;
