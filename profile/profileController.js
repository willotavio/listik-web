const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const user = require('./../middlewares/userSession');
const auth = require('./../middlewares/auth');

const User = require('./../user/userModel');
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

router.get('/profile/edit', user, auth, (req, res) => {
    res.render('profile/editProfile');
});

router.post('/profile/edit', async (req, res) => {
    try{
        const currentEmail = req.session.userSession.userEmail;
        const userId = req.body.userId;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
    
        const emailMatch = await User.findOne({where: {userEmail: currentEmail}});
        if(emailMatch){
            const passwordMatch = await bcrypt.compare(userPassword, emailMatch.userPassword);
            if(passwordMatch){
                const result = await User.findAll({where: {
                    [Op.or]: [
                        {userName: userName},
                        {userEmail: userEmail}
                    ],
                    id: {
                        [Op.ne]: userId
                    }}
                });
                if(result.length === 0){
                    await User.update({userName: userName, userEmail: userEmail}, {
                        where:{
                            id: userId
                        }
                    });
                    res.redirect('/profile');
                }
                else{
                    res.redirect('/profile/edit');
                }
            }
            else{
                res.redirect('/profile/edit');
            }
        }
        else{
            res.redirect('/profile/edit');
        }
    }
    catch(err){
        res.send(err);
    }
});

module.exports = router;