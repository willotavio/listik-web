const express = require('express');
const router = express.Router();

const Task = require('./taskModel');

const auth = require('./../middlewares/auth');
const user = require('./../middlewares/userSession');

router.get('/tasks', user, auth, (req, res) => {
    const userId = req.session.userSession.id;
    Task.findAll({
        raw: true, where: {taskComplete: 0, userId: userId}
    }).then((tasks) => {
        res.render('tasks/tasksHome', {
            tasks: tasks
        });
    });
});

router.get('/tasks/completed', user, auth, (req, res) => {
    const userId = req.session.userSession.id;
    Task.findAll({
        raw: true, where: {taskComplete: 1, userId: userId}
    }).then((tasks) => {
        res.render('tasks/completedTasks', {
            tasks: tasks
        });
    });
});

router.get('/tasks/new', user, auth, (req, res) => {
    res.render('tasks/addTask');
});

router.post('/tasks/save', auth, (req, res) => {
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;
    const taskDeadline = req.body.taskDeadline;
    const userId = req.session.userSession.id;
    Task.create({
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDeadline: taskDeadline,
        taskComplete: false,
        userId: userId
    }).then(() => {
        res.redirect('/tasks');
    });
});

router.post('/tasks/delete', user, auth, (req, res) => {
    const id = req.body.taskId;
    Task.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/tasks');
    });
});

router.get('/tasks/edit/:id', user, auth, (req, res) => {
    const taskId = req.params.id;
    if(!isNaN(taskId)){
        Task.findByPk(taskId).then((task) => {
            if(task){
                res.render('tasks/editTask', {task: task});
            }
            else{
                res.redirect('/tasks');
            }
        });
    }
    else{
        res.redirect('/tasks');
    }
});

router.post('/tasks/edit/save', user, auth, (req, res) => {
    const taskId = req.body.taskId;
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;
    const taskDeadline = req.body.taskDeadline;
    const taskComplete = req.body.taskComplete;
    Task.update({taskTitle: taskTitle, taskDescription: taskDescription, taskDeadline: taskDeadline, taskComplete: taskComplete}, {
        where: {id: taskId}
    }).then(() => {
        res.redirect('/tasks');
    });
});

module.exports = router;