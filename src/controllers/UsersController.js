const connection = require('../database/connection')

class UsersController {
    
    async index(req, res, next) {

        const { id } = req.query

        try {

            let query = connection('users').select('*')

            if(id){
                query.where('id', id)
            }

            const users =  await query
            
            return res.json({
                users,
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

    async login (req, res, next) {

        try {
        
            const { email, password } = req.body

            if(email == '' || email == undefined || email == null)
                return res.json({ message: 'O campo e-mail é obrigatório!' })

            if(password == '' || password == undefined || password == null)
                return res.json({ message: 'O campo senha é obrigatório!' })

            const [user] = await connection('users').select('*').where('email', email)

            if(!user)
                return res.json({ message: 'E-mail inválido!' })

            if (password != user.password)
                return res.json({ message: 'Senha inválida!' })

            return res.json({
                id: user.id,
                name: user.name, 
                email, 
                password,
                message: 'Login realizado com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
            // console.log(err)
            // return res.status(400).send({ error: 'Login failed: ', err })
        }

    }
    
    async create(req, res, next) {

        try {

            const { name, email, password } = req.body

            if(name == '' || name == undefined || name == null)
                return res.json({ message: 'O campo nome é obrigatório!'})

            if(email == '' || email == undefined || email == null)
                return res.json({ message: 'O campo e-mail é obrigatório!'})

            if(password == '' || password == undefined || password == null)
                return res.json({ message: 'O campo senha é obrigatório!'})

            // verifica se ja existe o e-mail cadastrado
            let [user] = await connection('users').count('*').where('email', email)

            if(user.count > 0) 
                return res.json({ message: 'E-mail ja cadastrado' })

            // insere o registro no banco de dados
            const [userId] = await connection('users').insert({
                name,
                email,
                password,
            }).returning('id')
            
            // retorna uma resposta com a messagem, id do registro inserido e o email do registro inserido
            return res.json({
                id: userId,
                email,
                message: 'Usuário cadastrado com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

    async update(req, res, next) {

        try {

            const { id } = req.params
            let { name, email, password } = req.body

            // consulta no banco de dados se o usuario existe (buscando pelo id)
            let [user] = await connection('users').select('*').where('id', id)
            // se nao encontrar nenhum usuario retona a mensagem de ID invalido
            if(!user)
                return res.json({ message: 'Usuário não encontrado (ID inválido)'})

            if(name == '' || name == undefined || name == null)
                name = user.name // caso o campo name nao tenha sido informado assume o que esta no banco de dados

            if(email == '' || email == undefined || email == null)
                email = user.email // caso o campo email nao tenha sido informado assume o que esta no banco de dados

            if(password == '' || password == undefined || password == null)
                password = user.password // caso o campo password nao tenha sido informado assume o que esta no banco de dados
            
            // executa o update no banco de dados
            await connection('users')
                .update({ 
                    name,
                    email,
                    password, 
                }).where('id', id)
            
            // retorna a mensagem de alterado com sucesso e mostra os dados que ficaram
            return res.json({
                id,
                name,
                email,
                password,
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
            const [user] = await connection('users').select('*').where('id', id)

            if(!user)
                return res.json({ message: 'Não foi possivel excluir o registro, (id não foi encontrado)!' })

            const result = await connection('users')
                .where('id', id)
                .del()
            
            return res.json({
                id,
                message: 'Registro excluido com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

}

module.exports = UsersController