// server/server.js
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', (req, res) => {
  // console.log(req.body);
  const { name, email, message } = req.body;
  const mailOptions = {
    from: '24yashbari@gmail.com',
    to: '24yashbari@gmail.com', // Change this to the recipient email address
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
// console.log('mailoptions',mailOptions);
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.post('/normal-send-email', (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  const mailOptions1 = {
    from: '24yashbari@gmail.com',
    to: '24yashbari@gmail.com', // Change this to the recipient email address
    subject: 'Contact Form Submission',
    text: `Email: ${email}`,
  };
console.log('mailoptions1',mailOptions1);
 transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
