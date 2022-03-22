const express = require("express");
const app = express();

const User = require("../models/user.model");

app.get("", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});


module.exports = app;