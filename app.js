const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
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

const taskModel = require('./tasks/taskModel');
const taskController = require('./tasks/taskController');
app.use('/', taskController);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("Server On!");
});