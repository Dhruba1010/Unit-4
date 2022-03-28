const express = require('express');
const router = express.Router();

const Gallery = require('../models/gallery.model');

const upload = require('../middlewares/upload');

router.get('', async (req, res) => {
    try {
        const gallery = await Gallery.find().lean().exec();
        return res.status(200).send(gallery);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.post('', upload.array('pictures', 5), async (req, res) => {
    try {
        const filePaths = req.files.map((file) => {
            return file.path;
        });

        const gallery = await Gallery.create({
            userId: req.body.userId,
            pictures: filePaths,
        });
        return res.status(201).send(gallery);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.patch('/:id', upload.array('pictures', 5), async (req, res) => {
    try {
        const filePaths = req.files.map((file) => {
            return file.path;
        });

        const gallery = await Gallery.findByIdAndUpdate(req.params.id,{
            userId: req.body.userId,
            pictures: filePaths,
        },{new:true}).lean().exec();
        return res.status(201).send(gallery);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(gallery);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});

module.exports = router;