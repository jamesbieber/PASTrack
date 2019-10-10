const knex = require('knex')
const knexFile = require('../../knexfile')
const db = knex(knexFile.development)

module.exports = {
    getUsers,
    getTests,
    getById,
    insert,
    update,
  };
  
function getUsers() {
    return db("users");
}

function getTests(id) {
    return db("tests")
        .join("users", "users.id", "tests.user_id")
        .select(
            "tests.id", 
            "tests.pullups", 
            "tests.situps", 
            "tests.pushups",
            "tests.run",
            "tests.underwater_one",
            "tests.underwater_two",
            "tests.swim",
        )
        .where({ user_id: id });
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