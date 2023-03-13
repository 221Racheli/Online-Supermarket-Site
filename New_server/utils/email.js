var nodemailer = require('nodemailer');

// https://support.google.com/mail/answer/185833?hl=iw


const sentMail =  (text,subject , email) => {
var transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: process.env.USER,
  to: email,
  subject: subject,
  text: text,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})};

module.exports={sentMail}