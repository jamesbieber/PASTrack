const router = require('express').Router();

const dbTests = require('../models/testModel')
const dbUsers = require('../models/userModel')

router.post('/newtest', async (req, res) => {
    const test = req.body;
    const {
        user_id,
        pullups,
        situps,
        pushups,
        run,
        underwater_one,
        underwater_two,
        swim
    } = req.body;

    if( !user_id || 
        !pullups || 
        !situps ||
        !pushups ||
        !run ||
        !underwater_one ||
        !underwater_two ||
        !swim ) 
    {
        res.status(500).json({message: "Please ensure required parameters are entered."})
    }

    if(test) {
        try {
            const insert = await dbTests.insert(test);
            res.status(201).json(insert)
        }
        catch(error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json({message: "Could not create test."})
    }
})

router.get('/', async (req, res) => {
    try {
        const tests = await dbTests.getTests();
        res.status(201).json(tests);
    }
    catch(error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const tests = await dbTests.getById(req.params.id)
        if(tests) {
            res.status(201).json(tests);
        } else {
            res.status(404).json({message: "Could not find test"})
        }
    }
    catch(error) {
        res.status(500).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const changes = req.body
        const test = await dbTests.update(req.params.id, changes)

        if(test) {
            res.status(201).json(test)
        } else {
            res.status(500).json({message: "Could not update test."})
        }
    }
    catch(error) {
        res.status(404).json({message: "Could not find test."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await dbTests.remove(req.params.id)

        if(count > 0) {
            res.status(201).json({message: "Test deleted successfully."})
        } else {
            res.status(404).json({message: "Could not find test to delete."})
        }
    }
    catch(error) {
        res.status(500).json({message: "Could not delete test."})
    }
})

module.exports = router;