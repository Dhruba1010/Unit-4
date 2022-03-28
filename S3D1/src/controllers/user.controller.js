const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

const { body, validationResult } = require('express-validator');

router.get('', async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.post('',
body('first_name').notEmpty().withMessage('First Name is required').bail(),
body('last_name').notEmpty().withMessage('Last Name is required').bail(),
body('email').notEmpty().isEmail().withMessage('Please enter a valid email address').bail()
    .custom(async (v) => {
        const user = await User.findOne({ email:v});
        if(user){
            throw new Error('Email already registered');
        }
        return true;
    }).bail(),
body('pincode').notEmpty().isLength(6).withMessage('Pincode should be at least 6 characters long').bail(),
body('age').notEmpty().isFloat({ min: 1, max: 100 }).withMessage('Age should be between 1 and 100').bail(),
body('gender').notEmpty().bail(),
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.create(req.body);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
})

module.exports = router;