const express = require('express');
const app = express.Router();

const {login,dashboard} = require('../controllers/main')

app.route('/dashboard').get(dashboard);
app.route('/login').post(login);


module.exports = app ;