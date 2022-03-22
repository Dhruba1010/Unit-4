const express = require("express");
const app = express();

const Student = require("../models/student.model");

app.get("", async (req, res) => {
    try {
        const students = await Student.find().lean().exec();
        return res.status(200).send(students);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(200).send(student);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean().exec();
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
})

app.patch('', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        return res.status(200).send(student);
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
});



module.exports = app;