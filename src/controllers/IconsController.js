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
            const [iconId] = await connection('icons').insert({
                title,
                image_url,
            }).returning('id')
            
            // retorna uma resposta com os dados inseridos
            return res.json({
                id: iconId,
                title,
                image_url,
                message: 'Ícone cadastrado com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

}

module.exports = IconsController