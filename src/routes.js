const express = require('express')

const IconsController = require('./controllers/IconsController')
const UsersController = require('./controllers/UsersController')
const TasksController = require('./controllers/TasksController')

const iconsContoller = new IconsController()
const usersContoller = new UsersController()
const tasksContoller = new TasksController()

const routes = express.Router()

routes.get('/', (req, res, next) => {
    return res.json({
        message: 'API Back-end'
    })
})

routes.get('/icons', iconsContoller.index)

routes.get('/users', usersContoller.index)
routes.post('/login', usersContoller.login)
routes.post('/users', usersContoller.create)
routes.put('/users/:id', usersContoller.update)
routes.delete('/users/:id', usersContoller.delete)

routes.get('/tasks', tasksContoller.index)
routes.post('/tasks', tasksContoller.create)
routes.put('/tasks/:id', tasksContoller.update)
routes.delete('/tasks/:id', tasksContoller.delete)

module.exports = routes