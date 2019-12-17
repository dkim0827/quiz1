exports.up = function (knex) {
    return knex.schema.createTable('clucks', table => {
        table.increments('id')
        table.string('username')
        table.text('content')
        table.string('image_url')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt')
    })
};

exports.down = function (knex) {
    return knex.shcema.dropTable('clucks')
};