const knex = require('knex')
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/dev.db'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.post('/register', async (req, res) => {
    
})

router.get('/', async (req, res) => {
    try {
        const users = await db('users');
        res.status(201).json(users);
    }
    catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router;