// import
const ideasRouter = require('express').Router();

// import form db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// export
module.exports = ideasRouter;

/** Ideas Controller **/

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// Get all Ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// Get Ideas by Id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// Create New Idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const createNewIdea = addToDatabase('ideas', req.body);
    res.status(201).send(createNewIdea);
});

// Update Ideas by Id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updateIdeasById = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdeasById);
});

// Deleted Ideas
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdeas = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdeas) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
