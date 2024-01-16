const getUser = "SELECT * FROM users WHERE email = $1";
const saveToken = "INSERT INTO tokens (user_id, token) VALUES ($1, $2)";
const getToken = "SELECT * FROM tokens WHERE token = $1";
const logUser = "UPDATE users SET active = $1 WHERE user_id = $2";
const deleteToken = "DELETE FROM tokens WHERE user_id = $1";


module.exports = {
    getUser,
    saveToken,
    getToken,
    logUser,
    deleteToken,
}