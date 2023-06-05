const express = require('express');
const router = express.Router();

const Task = require('./taskModel');

router.get('/tasks', (req, res) => {
    res.render('tasks/tasksHome');
});

router.get('/tasks/new', (req, res) => {
    Task.findAll({
        raw: true
    }).then((result) => {
        res.render('tasks/addTask', result);
    });
});

router.post('/tasks/save', (req, res) => {
    const title = req.body.taskTitle;
    const description = req.body.taskDescription;
    const deadline = req.body.taskDeadline;
    Task.create({
        title: title,
        description: description,
        deadline: deadline
    }).then(() => {
        res.redirect('tasks/');
    });
});

module.exports = router;