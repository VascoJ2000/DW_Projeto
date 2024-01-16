// import .env file
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');

const userRoutes = require('./src/users/routes');
const incomeRoutes = require('./src/incomes/routes');
const expensesRoutes = require('./src/expenses/routes');

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

const PORTA = process.env.SERVER_PORT || 443


app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expensesRoutes);




sslServer.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta ${PORTA}`)
})

