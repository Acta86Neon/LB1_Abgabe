// import from api.js
const minionsRouter = require('express').Router();

// import from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// export to api.js
module.exports = minionsRouter;


/** Minions Controller **/

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

// Get all Minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// Get a Minion by Id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// Add new Minions
minionsRouter.post('/', (req, res, next) => {
    const addNewMinion = addToDatabase('minions', req.body);
    res.status(201).send(addNewMinion);
});

// Update Minion
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// Delete Minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

// Get all Minions with Work
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(workLoad => {
        return workLoad.id === req.params.minionId;
    });
    res.send(work);
})

/** WORK Controller **/

// Add Minions with Work
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWord = addToDatabase('work', req.body);
    res.status(201).send(newWord);

});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

// Update Minions with work
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

// Delete Minion with work
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

