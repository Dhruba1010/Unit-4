const express = require('express');
const router = express.Router();

const Admin = require('../models/admin.model');

const transporter = require('../configs/mail');

router.get('', async (req, res) =>{
    try {
        const page = req.query.page;
        const pagesize = req.query.pagesize || 1;
        const skip = (page-1)*pagesize;
        const admins = await Admin.find().populate({path:'adminId', select: {firstName:1, lastName:1, email:1, _id:0}}).skip(skip).limit(pagesize).lean().exec();
        const totalPages = Math.ceil(await Admin.find().countDocuments())/pagesize;
        return res.status(200).send({admins, totalPages});
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
})

router.post('', async (req,res) => {
    try {
        const admin = await Admin.create(req.body);

        transporter.sendMail({
            from: '"Masai School" <operation@masai.school.com>', // sender address
            to: admin.email, // list of receivers
            subject: `${admin.firstName} ${admin.lastName} has registered with us.`, // Subject line
            text: `Please welcome ${admin.firstName} ${admin.lastName}.`, // plain text body
            html: `Please welcome ${admin.firstName} ${admin.lastName}.`, // html body
          });
        return res.status(201).send({message: 'New Admin registered.'});
    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

module.exports = router;