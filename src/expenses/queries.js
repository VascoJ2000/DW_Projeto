const getExpenseByUserID = "SELECT * FROM expenses WHERE user_id = $1";
const getExpenseByID = "SELECT * FROM expenses WHERE expense_id = $1";
const addExpense = "INSERT INTO expenses (user_id, amount, category, expense_date, description) VALUES ($1, $2, $3, $4, $5)";
const getUserExpenses = "SELECT * FROM expenses WHERE user_id = $1";
const removeExpense = "DELETE FROM expenses WHERE expense_id = $1";
const updateAmount = "UPDATE expenses SET amount = $1 WHERE expense_id = $2";
const updateCategory = "UPDATE expenses SET category = $1 WHERE expense_id = $2";
const updateDate = "UPDATE expenses SET expense_date = $1 WHERE expense_id = $2";
const updateDescription = "UPDATE expenses SET description = $1 WHERE expense_id = $2";

module.exports = {
    getExpenseByUserID,
    getExpenseByID,
    addExpense,
    getUserExpenses,
    removeExpense,
    updateAmount,
    updateCategory,
    updateDate,
    updateDescription,
};
