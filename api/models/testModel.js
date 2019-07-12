const knex = require('knex')
const knexFile = require('../../knexfile')
const db = knex(knexFile.development)

module.exports = {
    getTests,
    getById,
    insert,
    update,
    remove
  };
  
function getTests() {
    return db("tests");
}

function getById(id) {
    return db("tests").where({ id }).first();
}
  
function insert(test) {
    return db("tests")
        .insert(test)
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(id, changes) {
    return db('tests')
        .where({id})
        .update(changes, '*');
}

function remove(id) {
    return db('tests')
        .where({id})
        .del();
}