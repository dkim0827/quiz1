const knex = require('./client')

const queries = {
    getAll() {
        return knex('clucks').select('*')
    },

    new(n) {
        return knex('clucks').insert(n, '*')
    }
}

module.exports = queries