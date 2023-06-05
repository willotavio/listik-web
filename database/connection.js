const Sequelize = require('sequelize');

const connection = new Sequelize('listik', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;