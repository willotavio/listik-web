const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Task = connection.define('tasks', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

Task.sync({force: false});

module.exports = Task;