const express = require('express');
const router = express.Router();

const user = require('./../middlewares/userSession');
const auth = require('./../middlewares/auth');

const Tasks = require('./../tasks/taskModel');

router.get('/profile', user, auth, (req, res) => {
    const userSession = req.session.userSession;
    Tasks.findAll({where: {userId: userSession.id}}).then((tasks) => {
        const completedTasks = tasks.filter((tasks) => tasks.taskComplete == 1);
        const uncompletedTasks = tasks.filter((tasks) => tasks.taskComplete == 0);
        res.render('profile/profile', {
            tasks: tasks,
            uncompletedTasks: uncompletedTasks.length,
            completedTasks: completedTasks.length});
    }).catch((err) => {
        res.redirect('/');
    })
});

module.exports = router;