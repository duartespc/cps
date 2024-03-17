const concurrently = require('concurrently');
var nodemailer = require('nodemailer');
require("dotenv").config();

const upath = require('upath');

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user_email,
      pass: process.env.user_password
    }
  });
  
  var mailOptions = {
    from: 'dpspc542@gmail.com',
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

concurrently([
    { command: 'node scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' },
    { 
        open: 'false',
        command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
        name: 'SB_BROWSER_SYNC', 
        prefixColor: 'bgGreen.bold',
    }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
}).then(success, failure);

function success() {
    console.log('Success'); 
}

function failure() {
    console.log('Failure');
}