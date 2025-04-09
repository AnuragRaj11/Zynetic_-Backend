import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook, filterBooks, searchBooks } from '../controllers/bookController.js';
import authenticator from '../middleware/auth.js';

const router = express.Router();

// Book routes - all protected with authentication
router.post('/createbook', authenticator, createBook);
router.get('/getbooks', authenticator, getAllBooks);
router.get('/getbook/:id', authenticator, getBookById);
router.patch('/updatebook/:id', authenticator, updateBook);
router.delete('/deletebook/:id', authenticator, deleteBook);
router.get('/filterbooks', authenticator, filterBooks);
router.get('/searchbooks', authenticator, searchBooks);

export default router;