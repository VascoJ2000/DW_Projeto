const getUserByID = "SELECT * FROM users WHERE user_id = $1";
const addUser = "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)";
const checkEmail = "SELECT s FROM users s WHERE s.email = $1";
const removeUser = "DELETE FROM users WHERE user_id = $1";
const updateEmail = "UPDATE users SET email = $1 WHERE user_id = $2";
const updatePassword = "UPDATE users SET password_hash = $1 WHERE user_id = $2";
const updateActive = "UPDATE users SET active = $1 WHERE user_id = $2";
const updateRole = "UPDATE users SET role = $1 WHERE user_id = $2";

module.exports = {
    getUserByID,
    addUser,
    checkEmail,
    removeUser,
    updateEmail,
    updatePassword,
    updateActive,
    updateRole,
};
