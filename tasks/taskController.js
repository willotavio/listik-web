const express = require('express');
const router = express.Router();

router.get('/new-task', (req, res) => {
    res.render('tasks/addTask');
});

module.exports = router;