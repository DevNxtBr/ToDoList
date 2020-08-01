const connection = require('../database/connection')

module.exports = {
    
    async index(req, res, next) {

        try {

            const [users] = await connection('users').select('*')
            
            return res.json({
                users,
            })

        } catch (err) {
            next(err)
        }

    },
    
    async create(req, res, next) {

        try {

            const { name, email, password } = req.body

            if(name == '' || name == undefined || name == null)
                return res.json({ message: 'O NOME é obrigatório!'})

            if(email == '' || email == undefined || email == null)
                return res.json({ message: 'O E-MAIL é obrigatório!'})

            if(password == '' || password == undefined || password == null)
                return res.json({ message: 'A SENHA é obrigatória!'})

            // verifica se ja existe o e-mail cadastrado
            let [user] = await connection('users').count('*').where('email', email)

            if(user.count > 0) 
                return res.status(400).send({ error: 'E-mail ja cadastrado' })

            // insere o registro no banco de dados
            const [userId] = await connection('users').insert({
                name,
                email,
                password,
            }).returning('id')
            
            // retorna uma resposta com a messagem, id do registro inserido e o email do registro inserido
            return res.json({
                message: 'Usuário cadastrado com sucesso!',
                id: userId,
                email,
            })

        } catch (err) {
            next(err)
        }

    },

    async update(req, res, next) {

        try {

            const { id } = req.params
            let { name, email, password } = req.body

            // verifica se foi enviado o header com a palavra chave (temporariamente deixei fixo, mas podemos alterar para o jwt token que deixa mais seguro)
            if(req.headers.admin != 'pode-editar')
                return res.json({ message: 'Usuário sem permissão para alterar o registro' })

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
                message: 'Usuário alterado com sucesso!',
                id,
                name,
                email,
                password,
            })

        } catch (err) {
            next(err)
        }

    },

    async delete(req, res, next) {

        try {

            const { id } = req.params

            // verifica se o id existe
            const [user] = await connection('users').select('*').where('id', id)

            if(!user)
                return res.status(400).send({ error: 'Não foi possivel excluir o registro, (id não foi encontrado)!' })

            const result = await connection('users')
                .where('id', id)
                .del()
            
            return res.json({
                message: 'Registro excluido com sucesso!',
                id,
            })

        } catch (err) {
            next(err)
        }

    },

}