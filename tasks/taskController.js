const express = require('express');
const router = express.Router();

const Task = require('./taskModel');

router.get('/tasks', (req, res) => {
    Task.findAll({
        raw: true
    }).then((tasks) => {
        res.render('tasks/tasksHome', {
            tasks: tasks
        });
    });
});

router.get('/tasks/new', (req, res) => {
    res.render('tasks/addTask');
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
        res.redirect('/tasks');
    });
});

router.post('/tasks/delete', (req, res) => {
    const id = req.body.taskId;
    Task.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/tasks');
    });
});

module.exports = router;