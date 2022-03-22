const express = require("express");
const app = express();

const Evaluation = require("../models/evaluation.model");

app.get("", async (req, res) => {
    try {
        const evaluations = await Evaluation.find().lean().exec();
        return res.status(200).send(evaluations);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("", async (req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body);
        return res.status(201).send(evaluation);
    }
    catch(err){
        return res.status(500).send({message : err.message});
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const students = await Evaluation.find().populate('name').lean().exec();
        return res.status(200).send(students);
    }
    catch (err) {
        return res.status(500).send({message : err.message});
    }
})

module.exports = app;