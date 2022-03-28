
require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            if(err){
                return reject(err);
            }
            return resolve(decoded);
        });
    })
};


const authentication = async (req,res,next) => {

    if(!req.headers.authorization) {
        return res.status(400).send({message: 'authorization failed'});
    }

    if(!req.headers.authorization.startsWith('Bearer ')){
        return res.status(400).send({message: 'authorization failed'});
    }

    const token = req.headers.authorization.trim().split(' ')[1];

    let decoded;
    try {
        decoded = await verifyT(token);
    }
    catch (err) {
        return res.status(500).send({message: 'authorization failed'});
    }

    req.userId = decoded.user._id;

    return next();
};

module.exports = authentication;