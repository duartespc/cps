require("dotenv").config();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user_email,
    pass: process.env.user_password
  }
});

var mailOptions = {
  from: 'duarte.cambra@gmail.com',
  to: 'duarte.cambra@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});