
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const newToken = (user) => {
    return jwt.sign({user}, process.env.secretKey);
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email}).lean().exec();
        if (user) {
            return res.status(400).send({message: 'User already registered'});
        }
        user = await User.create(req.body);

        const token = newToken(user);
        return res.status(201).send({user, token});
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(400).send('Wrong Email or Password');
        }

        const compare = user.checkPassword(req.body.password);
        
        if(!compare) {
            return res.status(400).send('Wrong Email or Password');
        }
        const token = newToken(user);
        return res.status(200).send({user, token});
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
};

module.exports = {register,login};