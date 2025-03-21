const express = require('express')
const router = express.Router()
const {createAuthor, getAuthors, updateAuthor, deleteAuthor, getAuthorById} = require('../controllers/authorController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, createAuthor)
router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.put('/:id', authMiddleware, updateAuthor)
router.delete('/:id', authMiddleware, deleteAuthor)


module.exports = router