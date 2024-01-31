const homePopular = document.getElementById('homePopular');
const homeTop = document.getElementById('homeTop');
const homeUpcoming = document.getElementById('homeUpcoming');

const movieSection = document.getElementById('movies');

async function getMovies(type, page) {
    await fetch(`/api/movies/${type}/${page}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillPage(data, type, 'getMovies');
    })
    .catch(error => console.error('Error:', error));
}

async function searchMovies(searchbar, page) {
    if(searchbar === '') search = document.getElementById('searchbar').value;
    if (search === '') return getMovies('popular', '1');
    await fetch(`/api/movies/search/${search}&${page}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillPage(data, search, 'searchMovies');
    })
    .catch(error => console.error('Error:', error));
}

async function fillHome(){
    await fetch(`/api/movies/popular/1`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper d-flex flex-row flex-nowrap overflow-auto'
        const results = data.results
        for(let i = 0; i<10; i++){
            const card = createCard(results[i])
            cardWrapper.appendChild(card);
        }
        homePopular.appendChild(cardWrapper)
    })
    .catch(error => console.error('Error:', error));

    await fetch(`/api/movies/top/1`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper d-flex flex-row flex-nowrap overflow-auto'
        const results = data.results
        for(let i = 0; i<10; i++){
            const card = createCard(results[i])
            cardWrapper.appendChild(card);
        }
        homeTop.appendChild(cardWrapper)
    })
    .catch(error => console.error('Error:', error));

    await fetch(`/api/movies/upcoming/1`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper d-flex flex-row flex-nowrap overflow-auto'
        const results = data.results
        for(let i = 0; i<10; i++){
            const card = createCard(results[i])
            cardWrapper.appendChild(card);
        }
        homeUpcoming.appendChild(cardWrapper)
    })
    .catch(error => console.error('Error:', error));
}

function fillPage(data, search, searchType) {
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = '';
    data.results.forEach(movie => {
        const card = createCard(movie);
        movieContainer.appendChild(card);
    })
    const pageNav = document.getElementById('pageNav');
    const nextPage = data.page+1;
    const previousPage = data.page-1;
    if(data.page === 1){
        pageNav.innerHTML = `
        <button type="button" class="btn btn-primary me-2">Page 1</button>
        <button type="button" class="btn btn-secondary me-2" onclick="${searchType}('${search}', '${nextPage}')">></button>
        `;
    }else if(data.page === data.total_pages){
        pageNav.innerHTML = `
        <button type="button" class="btn btn-secondary me-2" onclick="${searchType}('${search}', '${previousPage}')"><</button>
        <button type="button" class="btn btn-primary me-2">Page ${data.page}</button>
        `;
    }else {
        pageNav.innerHTML = `
        <button type="button" class="btn btn-secondary me-2" onclick="${searchType}('${search}', '${previousPage}')"><</button>
        <button type="button" class="btn btn-primary me-2">Page ${data.page}</button>
        <button type="button" class="btn btn-secondary me-2" onclick="${searchType}('${search}', '${nextPage}')">></button>
        `;
    }
}

function createCard(movie) {
    const card = document.createElement('div');
    card.className = 'card mb-3 d-inline-block';
    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${movie.title}</h5>
            <a href="#" class="btn btn-primary d-block mt-auto" onclick="createNight(${movie.id}, '', '', ${false})">Create Night</a>
        </div>
    `;
    return card;
}

window.onload = fillHome()