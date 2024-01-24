const homePopular = document.getElementById('homePopular');
const homeTop = document.getElementById('homeTop');
const homeUpcoming = document.getElementById('homeUpcoming');

const movieSection = document.getElementById('movies');

async function getMovies(type, page) {
    await fetch(`/api/movies/${type}/${page}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillPage(data);
    })
    .catch(error => console.error('Error:', error));
}

async function searchMovies(search, page) {
    await fetch(`/api/movies/keyword=${search}&page=${page}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillPage(data);
    })
    .catch(error => console.error('Error:', error));
}

function fillPage(data) {

}

function fillHome(){

}