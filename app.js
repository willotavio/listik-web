const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('public/'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(session({
    secret: "piqueriquinhoportuga",
    cookie: { maxAge: 604800000 }
}));

const connection = require('./database/connection');
connection.authenticate()
    .then(() => {
        console.log("succesfully connected!");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    const userSession = req.session.userSession;
    res.render('home', {userSession});
});

const tasksController = require('./tasks/taskController');
app.use('/', tasksController);
const userController = require('./user/userController');
app.use('/', userController);
const profileController = require('./profile/profileController');
app.use('/', profileController);

app.listen(3000, () => {
    console.log("Server On!");
});