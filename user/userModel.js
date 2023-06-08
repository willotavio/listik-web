const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

User.sync({force: false});

module.exports = User;