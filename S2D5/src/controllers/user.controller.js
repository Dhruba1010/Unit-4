const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const Admin = require('../models/admin.model');

const transporter = require('../configs/mail');


router.get('', async (req, res) => {
    try {
        const page = req.query.page;
        const pagesize = req.query.pagesize || 1;
        const skip = (page-1)*pagesize;
        const users = await User.find().skip(skip).limit(pagesize).lean().exec();
        const totalPages = Math.ceil(await User.find().countDocuments())/pagesize;
        return res.status(200).send({users, totalPages});
    }
    catch (err) {
        return res.status(500).send({ message: err.message});
    }
});

router.post('', async (req,res) => {
    try {
        const user = await User.create(req.body);
        const admin = await Admin.find().populate('email').strictPopulate('email').lean().exec();
        console.log(admin);
        transporter.sendMail({
            from: '"Masai School" <operation@masai.school.com>', // sender address
            to: [user.email, admin.email], // list of receivers
            subject: `Welcome to Masai School ${user.firstName} ${user.lastName}`, // Subject line
            text: `Hi ${user.firstName}, Please confirm your email address.`, // plain text body
            html: `Hi ${user.firstName}, Please confirm your email address.`, // html body
          });
        return res.status(201).send({message: 'You registered succesfully in Masai School'});
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});


module.exports = router;