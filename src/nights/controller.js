const pool = require('../../db');
const queries = require('./queries');

const getNightByUserID = (req, res) => {
    const id = parseInt(req.token.user_id);

    pool.query(queries.getNightByUserID, [id], (err, data) => {
        if(err) return res.sendStatus(400);
        res.status(200).json(data.rows);
    });
}

const getNightByID = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });

    pool.query(queries.getNightByID, [id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(404);
        res.status(200).json(data.rows[0]);
    });
}

const addMovieNight = (req, res) => {
    const id = parseInt(req.token.user_id);
    const movie_id = parseInt(req.body.movie_id);
    const night_date  = Date.parse(req.body.date) || new Date();
    const description = req.body.description || null;
    
    pool.query(queries.addNight, [movie_id, night_date, description], (err, data) => {
        if(err) return res.sendStatus(400);

        pool.query(queries.addUserNight, [id, movie_id, true],(err, data) => {
            if(err) return res.sendStatus(400);
            res.status(201).json("Movie Night created Successfully");
        });
    });
}

const addUserToNight = (req, res) => {
    const id = parseInt(req.body.user_id);
    const movie_id = parseInt(req.body.movie_id);

    pool.query(queries.addUserNight, [id, movie_id, false],(err, data) => {
        if(err) return res.sendStatus(400);
        res.status(201).json("User added to Movie Night Successfully");
    });
}

const removeMovieNight = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });

    pool.query(queries.getNightByID, [id], (err, data) => {
        if(!data.rows.length) return res.status(404).send("Movie Night does not exist in the database!");
        
        pool.query(queries.removeNights, [id], (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(204).json("Movie Night removed Successfully")
        });
    });
}

const removeUserNight = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(404).send("Movie Night does not exist in the database!");

        pool.query(queries.removeNightsUser, [req.token.user_id, id], (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(204).json("User removed from movie night Successfully")
        });
    });
}

const updateMovieNight = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });

    pool.query(queries.getNightByID, [id], (err, data) => {
        if(!data.rows.length) return res.send("Movie Night does not exist in the database!");
        
        // Get Night info if can't get defaults to false so the code correspondent to that part is ignored
        const movie_id = req.body.movie_id || false;
        const night_date = Date.parse(req.body.date) || false;
        const description = req.body.description || false;

        if(movie_id){
            pool.query(queries.updateMovie, [movie_id, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }
        
        if(night_date){
            pool.query(queries.updateDate, [night_date, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        if(description){
            pool.query(queries.updateDescription, [description, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }
        res.status(200).json("Movie Night updated Successfully");
    });
}

const confirmUserNight = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });
    pool.query(queries.updateConfirmation, [true, req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);

        res.status(200).json("Confirmation Successfull");
    });
}

const updateNightHost = (req, res) => {
    const id = parseInt(req.params.id);
    const new_host_id = parseInt(req.body.new_host_id);

    pool.query(queries.getUserNight, [req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });
    pool.query(queries.getUserNight, [new_host_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(403);
    });
    pool.query(queries.updateHost, [true, new_host_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
    });
    pool.query(queries.updateHost, [false, req.token.user_id, id], (err, data) => {
        if(err) return res.sendStatus(400);
    });
    res.status(200).json("Host Changed Successfully");
}

module.exports = {
    getNightByUserID,
    getNightByID,
    addMovieNight,
    addUserToNight,
    removeMovieNight,
    removeUserNight,
    updateMovieNight,
    confirmUserNight,
    updateNightHost,
}