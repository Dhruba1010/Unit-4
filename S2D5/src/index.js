const express = require("express");
const app = express();
app.use(express.json());

const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');

app.use ('/users', userController);
app.use('/admin', adminController);





module.exports = app;