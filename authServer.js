// import .env file
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs')

const authRoutes = require('./src/auth/routes');

const app = express();

const sslServer = https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert:fs.readFileSync('cert/certificate.pem')
}, app)

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({origin: [`https://localhost:${process.env.SERVER_PORT}`, `https://127.0.0.1:${process.env.SERVER_PORT}`, 'https://127.0.0.1']}));

const PORTA = process.env.AUTH_PORT || 4000

// Routes
app.use('/api/auth', authRoutes);


sslServer.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta ${PORTA}`)
})

