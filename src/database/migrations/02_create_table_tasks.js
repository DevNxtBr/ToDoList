exports.up = function(knex) {
  
    return knex.schema.createTable('tasks', function(table){
        table.increments('id').primary()
        table.string('description').notNullable()
        table.integer('difficulty').notNullable()
        table.boolean('concluded').defaultTo(false)

        table.integer('owner')
            .notNullable()
            .references('id')
            .inTable('users')

    })

}

exports.down = function(knex) {
  
    return knex.schema.dropTable('tasks')
    
}
