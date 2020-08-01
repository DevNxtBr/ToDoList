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

}

module.exports = IconsController