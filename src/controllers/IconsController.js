const { Request, Response } = require('express')
const connection = require('../database/connection')

class IconsController {

    async index(req, res) {

        const icons = await connection('icons').select('*')
    
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

            const { title, image } = req.body

            if(title == '' || title == undefined || title == null)
                return res.json({ message: 'O campo titulo é obrigatório!'})

            if(image == '' || image == undefined || image == null)
                return res.json({ message: 'O campo imagem é obrigatório!'})


            // insere o registro no banco de dados
            const [iconId] = await connection('icons').insert({
                title,
                image,
            }).returning('id')
            
            // retorna uma resposta com os dados inseridos
            return res.json({
                id: iconId,
                title,
                image,
                message: 'Ícone cadastrado com sucesso!',
                success: true,
            })

        } catch (err) {
            next(err)
        }

    }

}

module.exports = IconsController