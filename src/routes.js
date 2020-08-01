const express = require('express')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const routes = express.Router()

routes.get('/', (req, res, next) => {
    return res.json({
        message: 'API Back-end'
    })
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/tasks', TaskController.index)
routes.post('/tasks', TaskController.create)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.delete)

module.exports = routes