const express = require('express');
const router = express.Router();

const Task = require('./taskModel');

router.get('/tasks', (req, res) => {
    Task.findAll({
        raw: true, where: {taskComplete: 0}
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
    const taskTitle = req.body.taskTitle;
    const taskDescription = req.body.taskDescription;
    const taskDeadline = req.body.taskDeadline;
    Task.create({
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDeadline: taskDeadline,
        taskComplete: false
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

router.get('/tasks/edit/:id', (req, res) => {
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

router.post('/tasks/edit/save', (req, res) => {
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