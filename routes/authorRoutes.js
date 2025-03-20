const express = require('express')
const router = express.Router()
const {createAuthor, getAuthors, updateAuthor, deleteAuthor, getAuthorById} = require('../controllers/authorController')


router.post('/', createAuthor)
router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)


module.exports = router