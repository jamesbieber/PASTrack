const router = require('express').Router();

const dbUsers = require('../models/userModel.js')

router.post('/register', async (req, res) => {
    const user = req.body;
    const {name, username, password} = req.body;

    if(!username || !password || !name) {
        res.status(500).json({message: "Please ensure required parameters are entered."})
    }

    if(user) {
        try {
            console.log(user);
            const insert = await dbUsers.insert(user);
            res.status(201).json(insert)
        }
        catch(error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json({message: "Could not create user."})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await dbUsers.getById(req.params.id);
        if(user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({message: "Could not find user"})
        }
    }
    catch(error) {
        res.status(500).json(error);
    }
})

router.get('/:id/tests', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await dbUsers.getById(id)
        const tests = await dbUsers.getTests(id);
        res.status(200).json({user: user.name, tests});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const changes = req.body;
        const user = await dbUsers.update(req.params.id, changes)

        if(user) {
            res.status(201).json(user);
        } else {
            res.status(500).json({message: "Could not update user."})
        }
    }
    catch(error) {
        res.status(404).json({message: "Could not find user."})
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await dbUsers.getUsers();
        res.status(201).json(users);
    }
    catch(error) {
        res.status(500).json(error)
    }
})

module.exports = router;