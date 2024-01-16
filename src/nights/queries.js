const getNightByUserID = "SELECT * FROM movieNights WHERE user_id = $1";
const getNightByID = "SELECT * FROM movieNights WHERE movieNight_id = $1";
const addNight = "INSERT INTO movieNights (user_id, movie_id, movieNight_date, description) VALUES ($1, $2, $3, $4)";
const removeNights = "DELETE FROM movieNights WHERE movieNights_id = $1";
const removeNightsUser = "DELETE FROM movieNights WHERE user_id = $1";
const updateMovie = "UPDATE movieNights SET movie_id = $1 WHERE movieNights_id = $2";
const updateDate = "UPDATE movieNights SET movieNights_date = $1 WHERE movieNights_id = $2";
const updateDescription = "UPDATE movieNights SET description = $1 WHERE movieNights_id = $2";

module.exports = {
    getNightByUserID,
    getNightByID,
    addNight,
    removeNights,
    removeNightsUser,
    updateMovie,
    updateDate,
    updateDescription,
};
