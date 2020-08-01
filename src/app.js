const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

// rota para arquivos estaticos (publicos, acessando a rota "http://localhost:3333/uploads/NOME_DO_ARQUIVO")
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

// esquema/middleware para pegar erros genericos do app
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

module.exports = app