const https = require("https");

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
// const PORT = 3050;

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));
const fs = require("fs");
const bodyParser = require("body-parser");

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/dist", express.static(process.cwd() + "/dist")); //make public static

// Creating object of key and certificate
// for SSL
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const transporter = nodemailer.createTransport({
  host: 'webdomain04.dnscpanel.com', // Your domain's SMTP server
  port: 465, // Port (use 587 if you don't need SSL)
  secure: true, // Use SSL (true) or TLS (false)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,  // Password for your email
  }
});

/* const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
}); */

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mailToMyself = {
      sender: `${data.name} <${data.email}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    const mailToClient = {
      from: `WeOutsideTours <${process.env.EMAIL}>`,
      to: data.email, // receiver email,
      subject: "WeOutside Tours received your contact",
      text: `Hello ${data.name},\n\nThank you for your contact!\nOur team will get back to you within 48h\nIf you prefer a direct contact call us or leave us a message on our Phone or WhatsApp (+3511898212).\n\nThe best regards from WeOutside Tours`,
    };
    transporter.sendMail(mailToClient, (err, data) => {
      res.status(200).send("Email successfully sent to customer!");
    });
    transporter.sendMail(mailToMyself, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

//Index page (static HTML)
/* app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/dist/index.html");
}); */

https.createServer(options, app)
    .listen(3000, function (req, res) {
        console.log("Server started at port 3000");
    });
