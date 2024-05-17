const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = {}; // Store user data temporarily. Replace with a database in production.
let verificationCodes = {}; // Store verification codes temporarily.

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.post('/sendVerificationCode', (req, res) => {
    const { email } = req.body;
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    verificationCodes[email] = verificationCode;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send verification code' });
        }
        res.status(200).json({ message: 'Verification code sent' });
    });
});

app.post('/verifyCode', (req, res) => {
    const { email, code } = req.body;

    if (verificationCodes[email] === code) {
        res.status(200).json({ message: 'Email verified' });
    } else {
        res.status(400).json({ error: 'Invalid verification code' });
    }
});

app.post('/createAccount', (req, res) => {
    const { email, username } = req.body;

    if (!verificationCodes[email]) {
        return res.status(400).json({ error: 'Email not verified' });
    }

    users[email] = { username, score: 0, emailVerified: true };
    delete verificationCodes[email];
    res.status(200).json({ message: 'Account created successfully' });
});

app.get('/scoreboard', (req, res) => {
    const scoreboard = Object.values(users).map(user => ({
        username: user.username,
        score: user.score
    }));
    res.status(200).json(scoreboard);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
