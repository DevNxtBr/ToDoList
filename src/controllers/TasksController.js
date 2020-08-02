const connection = require('../database/connection')

class TasksController {
    
    async index(req, res, next) {

        try {

            const tasks = await connection('tasks').select('*')

            return res.json({
                tasks,
            })

        } catch (err) {
            next(err)
        }

    }
    
    async create(req, res, next) {

        try {

            const { description, difficulty, owner } = req.body

            if(description == '' || description == undefined || description == null)
                return res.json({ message: 'A DESCRIÇÃO é obrigatória!'})

            if(difficulty == '' || difficulty == undefined || difficulty == null)
                return res.json({ message: 'A DIFICULDADE é obrigatória!'})
            
            if(owner == '' || owner == undefined || owner == null)
                return res.json({ message: 'O DONO DA TAREFA é obrigatório!'})

            // verifica se o id do usuario (owner) existe
            let [user] = await connection('users').where('id', owner)

            if(!user) 
                return res.status(400).send({ error: 'Dono da tarefa inválido!' })

            // insere o registro no banco de dados
            const [taskId] = await connection('tasks').insert({
                description, 
                difficulty, 
                owner,
            }).returning('id')
            
            // retorna uma resposta com a messagem, id do registro inserido e o email do registro inserido
            return res.json({
                message: 'Tarefa cadastrada com sucesso!',
                id: taskId,
                description, 
                difficulty, 
                owner,
            })

        } catch (err) {
            next(err)
        }

    }

    async update(req, res, next) {

        try {

            const { id } = req.params
            let { description, difficulty, concluded } = req.body

            // verifica se o id da tarefa existe
            let [task] = await connection('tasks').where('id', id)

            if(!task) 
                return res.status(400).send({ error: 'Não foi possivel localizar a tarefa!' })

            if(description == '' || description == undefined || description == null)
                description = task.description

            if(difficulty == '' || difficulty == undefined || difficulty == null)
                difficulty = task.difficulty
            
            if(concluded == '' || concluded == undefined || concluded == null)
                concluded = task.concluded
            
            // executa o update no banco de dados
            await connection('tasks')
                .update({ 
                    description, 
                    difficulty, 
                    concluded,
                }).where('id', id)
            
            // retorna a mensagem de alterado com sucesso e mostra os dados que ficaram
            return res.json({
                message: 'Usuário alterado com sucesso!',
                id,
                description, 
                difficulty, 
                concluded,
                owner: task.owner
            })

        } catch (err) {
            next(err)
        }

    }

    async delete(req, res, next) {

        try {

            const { id } = req.params

            // verifica se o id existe
            const [task] = await connection('tasks').select('*').where('id', id)

            if(!task)
                return res.status(400).send({ error: 'Não foi possivel excluir a tarefa, (id não foi encontrado)!' })

            const result = await connection('tasks')
                .where('id', id)
                .del()
            
            return res.json({
                message: 'Tarefa excluida com sucesso!',
                id,
            })

        } catch (err) {
            next(err)
        }

    }

}

module.exports = TasksController