const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

// esquema/middleware para pegar erros genericos do app
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

module.exports = app