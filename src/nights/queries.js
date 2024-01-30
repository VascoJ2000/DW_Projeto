// movie_night table queries
const getNightByID = "SELECT * FROM movie_nights WHERE movie_night_id = $1";
const addNight = "INSERT INTO movie_nights (movie_id, movie_night_date, description) VALUES ($1, TO_TIMESTAMP($2, 'YYYY-MM-DDTHH24:MI'), $3)";
const removeNights = "DELETE FROM movie_nights WHERE movie_night_id = $1";
const updateMovie = "UPDATE movie_nights SET movie_id = $1 WHERE movie_night_id = $2";
const updateDate = "UPDATE movie_nights SET movie_night_date = $1 WHERE movie_night_id = $2";
const updateDescription = "UPDATE movie_nights SET description = $1 WHERE movie_night_id = $2";
const getNight = "SELECT * FROM movie_nights WHERE movie_id = $1 AND movie_night_date = TO_TIMESTAMP($2, 'YYYY-MM-DDTHH24:MI') AND description = $3";

// user_night table queries
const getUserNight = "SELECT * FROM user_nights WHERE (user_id, movie_night_id) = ($1, $2)";
const getNightByUserID = "SELECT user_nights.user_id, user_nights.movie_night_id, movie_id, movie_night_date, user_nights.confirmed, description FROM user_nights INNER JOIN movie_nights ON movie_nights.movie_night_id = user_nights.movie_night_id WHERE user_id = $1";
const removeNightsUser = "DELETE FROM user_nights WHERE (user_id, movie_night_id) = ($1, $2)";
const addUserNight = "INSERT INTO user_nights (user_id, movie_night_id, confirmed, night_host) VALUES ($1, $2, $3, $4)";
const updateConfirmation = "UPDATE user_nights SET confirmed = $1 WHERE user_id = $2 AND movie_night_id = $3";
const updateHost = "UPDATE user_nights SET night_host = $1 WHERE user_id = $2 AND movie_night_id = $3";

module.exports = {
    getNightByID,
    addNight,
    removeNights,
    updateMovie,
    updateDate,
    updateDescription,
    getUserNight,
    getNightByUserID,
    removeNightsUser,
    addUserNight,
    updateConfirmation,
    updateHost,
    getNight,
};
