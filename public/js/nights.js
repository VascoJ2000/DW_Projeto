const nightModal = document.getElementById('nightModal');
const bsnightModal = new bootstrap.Modal(nightModal, (backdrop = "static")); // Pode passar opções

const modalMovie = document.getElementById('nightMovieModal');
const modalDate = document.getElementById('nightDateModal');
const modalDescription = document.getElementById('nightDescriptionModal');

async function getUserNight(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/nights', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        generateTableHeader(data)
        generateTableBody(data);
    })
    .catch(error => console.error('Error:', error));
}

async function getNight(id){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch(`/api/nights/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => {response.json()})
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

async function postNight(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');

    const movie_id = modalMovie.value;
    const date = modalDate.value;
    const description = modalDescription.value;

    fetch('/api/nights', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            movie_id: movie_id,
            date: date,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}

async function putNight(id){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');

    const movie_id = modalMovie.value;
    const inputDate = modalDate.value;
    const date = new Date(inputDate).toISOString().split('T')[0];
    const description = modalDescription.value;

    fetch(`/api/nights/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            movie_id: movie_id,
            movie_night_date: date,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}

async function delNight(id){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch(`/api/nights/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to generate table header dynamically
function generateTableHeader(data) {
    const tableHeader = document.querySelector('#nightsTable thead');
    const headerRow = document.createElement('tr');

    // Assuming the first object in the array has all the fields
    Object.keys(data[0]).forEach(field => {
        const th = document.createElement('th');
        th.textContent = field;
        headerRow.appendChild(th);
    });

    // Add an extra column for Edit button
    const editTh = document.createElement('th');
    editTh.textContent = 'Actions';
    headerRow.appendChild(editTh);

    tableHeader.appendChild(headerRow);
}

// Function to generate table body dynamically
function generateTableBody(data) {
    const tableBody = document.querySelector('#nightsTable tbody');

    data.forEach(rowData => {
        const row = document.createElement('tr');

        Object.values(rowData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        // Add an Edit button to each row
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        editButton.addEventListener('click', () => createNight(rowData.movie_id, rowData.movie_night_date, rowData.description));
        
        const td = document.createElement('td');
        td.appendChild(editButton);
        row.appendChild(td);

        tableBody.appendChild(row);
    });
}

function createNight(movie_id, date, description) {
    modalMovie.value = movie_id;
    if(!date === '') {
        const dates = date.split(' ');
        modalDate.value = dates[0] + 'T' + dates[1];
    }
    modalDescription.value = description;

    bsnightModal.show();
}