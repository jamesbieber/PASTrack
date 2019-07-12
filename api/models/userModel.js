const knex = require('knex')
const knexFile = require('../../knexfile')
const db = knex(knexFile.development)

module.exports = {
    getUsers,
    getById,
    insert,
    update,
  };
  
function getUsers() {
    return db("users");
}

function getById(id) {
    return db("users").where({ id }).first();
}
  
function insert(user) {
    return db("users")
        .insert(user)
        .then(ids => {
        return getById(ids[0]);
    });
}

function update(id, changes) {
    return db('users')
        .where({id})
        .update(changes, '*');
}