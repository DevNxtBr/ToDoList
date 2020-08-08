const connection = require('../database/connection')

class TasksController {
    
    async index(req, res, next) {

        const { id, userId } = req.query

        try {

            let query = connection('tasks').select('*')

            if(userId)
                query.where('owner', userId)

            if(id)
                query.where('id', id)

            const tasks =  await query

            return res.json({
                tasks,
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }
    
    async create(req, res, next) {

        try {

            const { description, difficulty, owner } = req.body

            if(description == '' || description == undefined || description == null)
                return res.json({ message: 'O campo descrição é obrigatório!'})

            if(difficulty == '' || difficulty == undefined || difficulty == null)
                return res.json({ message: 'O campo dificuldade é obrigatório!'})
            
            if(owner == '' || owner == undefined || owner == null)
                return res.json({ message: 'O campo dono da tarefas é obrigatório!'})

            // verifica se o id do usuario (owner) existe
            let [user] = await connection('users').where('id', owner)

            if(!user) 
                return res.json({ message: 'Dono da tarefa inválido!' })

            // insere o registro no banco de dados
            const [taskId] = await connection('tasks').insert({
                description, 
                difficulty, 
                owner,
            }).returning('id')
            
            // retorna uma resposta com a messagem, id do registro inserido e o email do registro inserido
            return res.json({
                id: taskId,
                description, 
                difficulty, 
                owner,
                message: 'Tarefa cadastrada com sucesso!',
                success: true,
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
                return res.json({ message: 'Não foi possivel localizar a tarefa!' })

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
                id,
                description, 
                difficulty, 
                concluded,
                owner: task.owner,
                message: 'Usuário alterado com sucesso!',
                success: true,
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
                return res.json({ message: 'Não foi possivel excluir a tarefa, (id não foi encontrado)!' })

            const result = await connection('tasks')
                .where('id', id)
                .del()
            
            return res.json({
                id,
                message: 'Tarefa excluida com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

}

module.exports = TasksController