const knex = require('knex')
const configuration = require('../../knexfile')

const connection = knex(configuration.development)

module.exports = connection



// COMANDO KNEX / MIGRATIONS
// comando para criar nova migration: npx knex migrate:make nome_da_migration
// comando para executar a migration (fazer migration): npx knex migrate:latest
// comando para executar a migration (desfazer migration): npx knex migrate:rollback