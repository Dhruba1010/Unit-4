const express = require('express');
const app = express();
app.use(express.json());

const userController = require('./controllers/user.controller');
const {register,login} = require('./controllers/auth.controller');
const postController = require('./controllers/post.controller');


app.use('/users', userController);
app.use('/register', register);
app.use('/login', login);
app.use('/posts', postController);



module.exports = app;