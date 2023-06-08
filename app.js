const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const connection = require('./database/connection');
connection.authenticate()
    .then(() => {
        console.log("succesfully connected!");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.render('home');
});

const tasksController = require('./tasks/taskController');
app.use('/', tasksController);
const userController = require('./user/userController');
app.use('/', userController);

app.listen(3000, () => {
    console.log("Server On!");
});