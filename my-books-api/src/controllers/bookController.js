import Book from '../../schemas/books.js';

// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, author, category, price, rating, publishedDate } = req.body;

        // Basic validation
        if (!title || !author || !category || !price || !publishedDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newBook = new Book({
            title,
            author,
            category,
            price,
            rating: rating || 0,
            publishedDate
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (error) {
        console.error('Create book error:', error);
        res.status(500).json({ error: 'Server error while creating book' });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const { sortBy, order, page = 1, limit = 10 } = req.query;
        let sortOptions = {};
        
        // Handle sorting
        if (sortBy === 'price' || sortBy === 'rating') {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1; // 1 for ascending, -1 for descending
        }
        
        // Convert string params to numbers
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        
        // Calculate skip value for pagination
        const skip = (pageNum - 1) * limitNum;
        
        // Get paginated results
        const books = await Book.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);
            
        // Get total count for pagination metadata
        const totalBooks = await Book.countDocuments();
        
        res.status(200).json({
            books,
            pagination: {
                totalBooks,
                totalPages: Math.ceil(totalBooks / limitNum),
                currentPage: pageNum,
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({ error: 'Server error while fetching books' });
    }
};

// Get a book by ID
export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error('Get book error:', error);
        res.status(500).json({ error: 'Server error while fetching book' });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({ error: 'Server error while updating book' });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({ error: 'Server error while deleting book' });
    }
};

// Filter books 
export const filterBooks = async (req, res) => {
    try {
        const { author, category, minRating } = req.query;
        const filter = {};
        
        if (author) {
            filter.author = author;
        }
        
        if (category) {
            filter.category = category;
        }
        
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }
        
        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        console.error('Filter books error:', error);
        res.status(500).json({ error: 'Server error while filtering books' });
    }
};

// Search books 
export const searchBooks = async (req, res) => {
    try {
        const { title } = req.query;
        
        if (!title) {
            return res.status(400).json({ error: 'Search term is required' });
        }
        
        const books = await Book.find({
            title: { $regex: title, $options: 'i' }  // case-insensitive partial match
        });
        
        res.status(200).json(books);
    } catch (error) {
        console.error('Search books error:', error);
        res.status(500).json({ error: 'Server error while searching books' });
    }
}; 