
const express = require("express");
const router = express.Router();
const authToken = require('../middlewares/authMiddleware');

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

router.post('/books', authToken, createBook);

router.put('/books/:bookId', authToken, updateBook);

router.delete('/books/:bookId', authToken, deleteBook);

module.exports = router;
