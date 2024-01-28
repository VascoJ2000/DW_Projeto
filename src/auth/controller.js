require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../db');
const queries = require('./queries');

const logIn = async (req, res) => {
    const { email, password } = req.body || null;
    if(!email || !password) return res.sendStatus(403);

    await pool.query(queries.getUser, [email], async (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(404);
        if(!(await bcrypt.compare(password, data.rows[0].password_hash))) return res.sendStatus(403);

        const user = data.rows[0];
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { noTimestamp: true });

        await pool.query(queries.logUser, [true, user.user_id], async (err, data) => {
            if(err) return res.sendStatus(400);
        })

        await pool.query(queries.saveToken, [user.user_id, refreshToken], async (err, data) => {
            if(err) return res.sendStatus(400);
            res.json({ accessToken: accessToken, refreshToken: refreshToken, email: user.email });
        })
    });
}

const logOut = async (req, res) => {
    const id = req.token.user_id;
    await pool.query(queries.deleteToken, [id], async (err, data) => {
        if(err) return res.sendStatus(404);
        await pool.query(queries.logUser, [false, req.token.user_id], async (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(204).json("User Logged Out.");
        })
    })
}

const refreshAccess = (req, res) => {
    const accessToken = generateAccessToken(req.token);
    res.json({accessToken: accessToken, email: req.token.email});
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
}

module.exports = {
    logIn,
    logOut,
    refreshAccess,
}