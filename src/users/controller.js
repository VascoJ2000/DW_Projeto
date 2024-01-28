const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');

const getUserByID = (req, res) => {
    const id = parseInt(req.token.user_id);
    pool.query(queries.getUserByID, [id], (err, data) => {
        if(err) return res.sendStatus(403);
        res.status(200).json(data.rows);
    });
}

const addUser = async (req, res) => {
    const { email, password } = req.body;
    const role = req.body.role || "normal";
    
    await pool.query(queries.checkEmail, [email], async (err, data) => {
        if(err) return res.sendStatus(400);
        if(data.rows.length){
            res.status(406).send("Email already in use!")
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query(queries.addUser, [email, hashedPassword, role], async (err, data) => {
                if(err) return res.sendStatus(400);
                res.status(201).json("User created Successfully");
            });
        }
    });
}

const removeUser = async (req, res) => {
    const id = parseInt(req.token.user_id);

    await pool.query(queries.getUserByID, [id], async (err, data) => {
        if(!data.rows.length) return res.send("User does not exist in the database!");
        
        await pool.query(queries.removeUser, [id], async (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(200).json("User removed Successfully")
        })
    });
}

const updateUser = async (req, res) => {
    const id = parseInt(req.token.user_id);

    await pool.query(queries.getUserByID, [id], async (err, data) => {
        if(!data.rows.length) return res.send("User does not exist in the database!");
        // Get user info, if can't get defaults to false so the code correspondent to that part is ignored
        const email= req.body.email || false;
        const password = req.body.password || false;

        if(email){
            await pool.query(queries.updateEmail, [email, id], async (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query(queries.updatePassword, [hashedPassword, id], async (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }
        res.status(200).json("User updated Successfully");
    });
}

const updateRole = async (req, res) => {
    const id = parseInt(req.body.user_id);
    const role = req.body.role;

    await pool.query(queries.getUserByID, [id], async (err, data) => {
        if(!data.rows.length) return res.send("User does not exist in the database!");
        
        await pool.query(queries.updateRole, [role, id], async (err, data) => {
            if(err) return res.sendStatus(400);
        });
        
        res.status(200).json("User updated Successfully");
    });
}

const getFriendlist = (req, res) => {
    const id = parseInt(req.token.user_id);
    pool.query(queries.getFriendlist, [id], (err, data) => {
        if(err) return res.sendStatus(403);
        res.status(200).json(data.rows);
    });
}

const addFriend = async (req, res) => {
    const id = parseInt(req.token.user_id);
    const friend_id = parseInt(req.body.friend_id);
    
    await pool.query(queries.getUserByID, [friend_id], async (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.status(406).send("User does not exist");

        await pool.query(queries.addFriend, [id, friend_id], async (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(201).json("Friend Added Successfully");
        });
    });
}

const removeFriend = async (req, res) => {
    const id = parseInt(req.token.user_id);
    const friend_id = parseInt(req.params.id);

    await pool.query(queries.getFriend, [id, friend_id], async (err, data) => {
        if(!data.rows.length) return res.send("User does not exist in your friendlist!");
        
        await pool.query(queries.removeUser, [id, friend_id], async (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(200).json("Friend removed Successfully")
        })
    });
}

module.exports = {
    getUserByID,
    addUser,
    removeUser,
    updateUser,
    updateRole,
    getFriendlist,
    addFriend,
    removeFriend,
}