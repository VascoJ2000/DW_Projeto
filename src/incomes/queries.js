const getIncomeByUserID = "SELECT * FROM incomes WHERE user_id = $1";
const getIncomeByID = "SELECT * FROM incomes WHERE income_id = $1";
const addIncome = "INSERT INTO incomes (user_id, amount, category, income_date, description) VALUES ($1, $2, $3, $4, $5)";
const getUserIncome = "SELECT * FROM incomes WHERE user_id = $1";
const removeIncome = "DELETE FROM incomes WHERE income_id = $1";
const updateAmount = "UPDATE incomes SET amount = $1 WHERE income_id = $2";
const updateCategory = "UPDATE incomes SET category = $1 WHERE income_id = $2";
const updateDate = "UPDATE incomes SET income_date = $1 WHERE income_id = $2";
const updateDescription = "UPDATE incomes SET description = $1 WHERE income_id = $2";

module.exports = {
    getIncomeByUserID,
    getIncomeByID,
    addIncome,
    getUserIncome,
    removeIncome,
    updateAmount,
    updateCategory,
    updateDate,
    updateDescription,
};
