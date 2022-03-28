const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'adc4ded9e14146', // generated ethereal user
    pass: 'f984037d2ff53f', // generated ethereal password
  },
});