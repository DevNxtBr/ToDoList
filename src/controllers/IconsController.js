const { Request, Response } = require('express')
const knex = require('../database/connection')

class IconsController {

    async index(req, res) {

        const icons = await knex('icons').select('*')
    
        const serializedIcons = icons.map(icon => {
            return {
                id: icon.id,
                title: icon.title,
                image_url: `http://todolist-senac.herokuapp.com/uploads/${icon.image}`,
                // image_url: `https://localhost:3333/uploads/${icon.image}`,
            }
        })
    
        return res.json(serializedIcons)
    
    }

    async create(req, res, next) {

        try {

            const { title, image_url } = req.body

            if(title == '' || title == undefined || title == null)
                return res.json({ message: 'O campo titulo é obrigatório!'})

            if(image_url == '' || image_url == undefined || image_url == null)
                return res.json({ message: 'O campo url da imagem é obrigatório!'})


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

}

module.exports = IconsController