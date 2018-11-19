// const express = require('express');
const meetingsRouter = require('express').Router();

// Import from db.js
const {
    addToDatabase,
    deleteAllFromDatabase,
    getAllFromDatabase,
    createMeeting
} = require('./db');


module.exports = meetingsRouter;

/** Meeting Controller **/

// Get als Meeting
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// Create new Meeting
meetingsRouter.post('/', (req, res, next) => {
    const createNewMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(createNewMeeting);
});

// Delete Meetings
meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});
