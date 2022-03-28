const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

const upload = require('../middlewares/upload');

router.get('', async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.post('', upload.single('profile_pic'), async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic:req.file.path,
        });
        return res.status(201).send(user);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});


module.exports = router;