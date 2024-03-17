
const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
app.use(express.static("views"));
const bodyParser = require("express").json;
app.use(bodyParser);
var nodemailer = require('nodemailer');
require("dotenv").config();
const cors = require("cors");
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user_email,
      pass: process.env.user_password
    }
  });
  
  app.post("/sendmail", (req, res) => {
    const {to, subject, message} = req.body;
    
    const mailOptions = {
      from: process.env.user_email,
      to: process.env.user_email,
      subject: subject,
      text: message
    }
  
    transporter
    .sendMail(mailOptions, function(error, info)
    {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
    .then(() => {
      res.sendFile(path.join(__dirname, "./views/index.html"))
    }));   
  
  
    console.log(message)
  }) 
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html")); //  todo change this
  })

  app.listen(port);
