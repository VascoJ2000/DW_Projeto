require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../../db');
const queries = require('./queries');

const verifyAccess = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(!accessToken) return res.status(403).send("No Token provided!");

    await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if(err) return res.status(403).send({ message: err.message});
        req.token = data;
        await pool.query(queries.getUser, [req.token.email], async (err, data) => {
            if(err) return res.sendStatus(400);
            if(!data.rows[0].active) return res.sendStatus(403);
            next();
        })
    })
}

const verifyRefresh = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if(!refreshToken) return res.status(403).send("No Token provided!");

    await pool.query(queries.getToken, [refreshToken], async (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if(err) return res.sendStatus(401);
            req.token = data;
            next();
        })
    })
}

const isAdmin = (req, res, next) => {
    if(!(req.token.role === "admin")) res.status(403).send("Admin role required!");
    next()
}

module.exports = {
    verifyAccess,
    verifyRefresh,
    isAdmin,
}