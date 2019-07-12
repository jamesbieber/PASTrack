const knex = require('knex')
const router = require('express').Router();

const db = knex(knexConfig) = {
    client: 'sqlite3',
    connection: {
        filename: '../data/dev.db'
    },
    useNullAsDefault: true
}

router.get('/users', async (req, res) => {
    try {
        const users = await db('users');
        res.status(201).json(users);
    }
    catch(error) {
        res.status(500).json(error)
    }
})