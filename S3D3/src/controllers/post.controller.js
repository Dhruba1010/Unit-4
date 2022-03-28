const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

const authenticate = require('../middlewares/authentication');

const { body, validationResult } = require('express-validator');

router.get('', async (req, res) => {
    try {
        const posts = await Post.find().lean().exec();
        return res.status(200).send(posts);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.post('', authenticate,
body('title').notEmpty().withMessage('Please enter a title').bail(),
body('body').notEmpty().withMessage('Please enter a body').bail(),
body('userId').notEmpty().withMessage('Please enter a userId').bail(),
async (req, res) => {
    req.body.userId = req.userId;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const post = await Post.create(req.body);
        return res.status(201).send(post);
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.patch('', authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.delete('', authenticate, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});

module.exports = router;