const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

let otpStore = {}; // Temporary storage for OTPs

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Request OTP
router.post('/request-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  otpStore[email] = otp; // Store OTP

  // Send OTP email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send OTP');
    } else {
      res.status(200).send('OTP sent successfully');
    }
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email];
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

module.exports = router;
