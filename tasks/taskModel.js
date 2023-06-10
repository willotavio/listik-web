const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = require('./../user/userModel');

const Task = connection.define('tasks', {
    taskTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    taskDeadline: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    taskComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

Task.belongsTo(User);
User.hasMany(Task);

Task.sync({force: false});

module.exports = Task;