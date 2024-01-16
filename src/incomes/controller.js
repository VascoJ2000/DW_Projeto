const pool = require('../../db');
const queries = require('./queries');

const getIncomeByUserID = (req, res) => {
    const id = parseInt(req.token.user_id);
    pool.query(queries.getIncomeByUserID, [id], (err, data) => {
        if(err) return res.sendStatus(400);
        res.status(200).json(data.rows);
    });
}

const getIncomeByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncomeByID, [id], (err, data) => {
        if(err) return res.sendStatus(400);
        if(!data.rows.length) return res.sendStatus(404);
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);
        res.status(200).json(data.rows[0]);
    });
}

const addIncome = (req, res) => {
    const user_id = parseInt(req.token.user_id);
    const amount = parseFloat(req.body.amount);
    const category = req.body.category;
    const income_date  = Date.parse(req.body.date) || new Date();
    const description = req.body.description || null;
    
    pool.query(queries.addIncome, [user_id, amount, category, income_date, description], (err, data) => {
        if(err) return res.sendStatus(400);
        res.status(201).json("Income created Successfully");
    });
}

const removeIncome = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getIncomeByID, [id], (err, data) => {
        if(!data.rows.length) return res.status(404).send("Income does not exist in the database!");
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);
        
        pool.query(queries.removeIncome, [id], (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(204).json("Income removed Successfully")
        });
    });
}

const updateIncome = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getIncomeByID, [id], (err, data) => {
        if(!data.rows.length) return res.send("Income does not exist in the database!");
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);
        
        // Get income info if can't get defaults to false so the code correspondent to that part is ignored
        const amount = parseFloat(req.body.amount) || false;
        const category = req.body.category || false;
        const income_date = Date.parse(req.body.date) || false;
        const description = req.body.description || false;
        if(amount){
            pool.query(queries.updateAmount, [amount, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        if(category){
            pool.query(queries.updateCategory, [category, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }
        
        if(income_date){
            pool.query(queries.updateDate, [income_date, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        if(description){
            pool.query(queries.updateDescription, [description, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }
        res.status(200).json("Income updated Successfully");
    });
}

module.exports = {
    getIncomeByUserID,
    getIncomeByID,
    addIncome,
    removeIncome,
    updateIncome,
}