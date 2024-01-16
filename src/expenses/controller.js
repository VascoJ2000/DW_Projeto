const pool = require('../../db');
const queries = require('./queries');

const getExpenseByUserID = (req, res) => {
    const id = parseInt(req.token.user_id);
    pool.query(queries.getExpenseByUserID, [id], (err, data) => {
        if(err) return res.sendStatus(403);
        if(!data.rows.length) return res.sendStatus(404);
        res.status(200).json(data.rows);
    });
}

const getExpenseByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getExpenseByID, [id], (err, data) => {
        if(err) return res.sendStatus(403);
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);
        res.status(200).json(data.rows[0]);
    });
}

const addExpense = (req, res) => {
    const user_id = parseInt(req.token.user_id);
    const amount = parseFloat(req.body.amount);
    const category = req.body.category;
    const expense_date  = Date.parse(req.body.date) || new Date();
    const description = req.body.description || null;
    
    pool.query(queries.addExpense, [user_id, amount, category, expense_date, description], (err, fata) => {
        if(err) return res.sendStatus(400);
        res.status(201).json("Expense created Successfully");
    });
}

const removeExpense = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getExpenseByID, [id], (err, data) => {
        if(!data.rows.length) return res.send("Expense does not exist in the database!");
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);
        pool.query(queries.removeExpense, [id], (err, data) => {
            if(err) return res.sendStatus(400);
            res.status(204).json("Expense removed Successfully")
        })
    });
}

const updateExpense = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getExpenseByID, [id], (err, data) => {
        if(!data.rows.length) return res.send("Expense does not exist in the database!");
        if(!(data.rows[0].user_id === req.token.user_id)) return res.sendStatus(403);

        // Get Expense info if can't get defaults to false so the code correspondent to that part is ignored
        const amount = parseFloat(req.body.amount) || false;
        const category = req.body.category || false;
        const Expense_date = Date.parse(req.body.date) || false;
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
        
        if(Expense_date){
            pool.query(queries.updateDate, [Expense_date, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        if(description){
            pool.query(queries.updateDescription, [description, id], (err, data) => {
                if(err) return res.sendStatus(400);
            });
        }

        res.status(200).json("Expense updated Successfully")
    });
}

module.exports = {
    getExpenseByUserID,
    getExpenseByID,
    addExpense,
    removeExpense,
    updateExpense,
}