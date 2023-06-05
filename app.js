const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


const taskController = require('./tasks/taskController');
app.use('/', taskController);


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("Server On!");
});