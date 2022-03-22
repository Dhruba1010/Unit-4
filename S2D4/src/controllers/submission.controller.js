const express = require("express");
const app = express();

const Submission = require("../models/submission.model");

app.get("", async (req, res) => {
    try {
        const submissions = await Submission.find().lean().exec();
        return res.status(200).send(submissions);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("", async (req, res) => {
    try {
        const submission = await Submission.create(req.body);
        return res.status(201).send(submission);
    }
    catch(err){
        return res.status(500).send({message : err.message});
    }
});


module.exports = app;