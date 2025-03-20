const express = require('express')
const router = express.Router()
const {createBook, getBooks, updateBook, deleteBook, getBookById} = require('../controllers/bookController')
const authMiddleware = require("../middleware/authMiddleware")


router.post('/', createBook)
router.get('/', getBooks)
router.get('/:id', getBookById)
router.put('/:id', authMiddleware, updateBook)
router.delete('/:id', deleteBook)

module.exports = router