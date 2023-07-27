const express = require('express');
const app = express.Router();
const userController = require('./user.controller');
const validatationUser = require('../user/validater/user.validation');
const user = new userController();
// const userValidater = require('./validater/enrichment.validation');
const validation = new validatationUser();
app.post('/signup', validation.signUp, user.signup);
module.exports = app;