const express = require('express')
const dataBase = require('./config/db')
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const userRoutes = require('./routes/userRoutes')

const port = 5500
const app = express()

/*require('dotenv').config()*/

app.use(express.json())

app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)
/*app.use('/api/user', userRoutes)*/

// Connecter à la base de données
dataBase()


app.listen(port, () => {
    console.log({message: `Le server est en ligne`})
})
