const nightModal = document.getElementById('nightModal');
const bsnightModal = new bootstrap.Modal(nightModal, (backdrop = "static"));

const deleteModal = document.getElementById('deleteModal');
const bsdeleteModal = new bootstrap.Modal(deleteModal, (backdrop = "static"));

const modalMovie = document.getElementById('nightMovieModal');
const modalDate = document.getElementById('nightDateModal');
const modalDescription = document.getElementById('nightDescriptionModal');

const modalSaveBtn = document.getElementById('nightModalSaveBtn');
const modalEditBtn = document.getElementById('nightModalEditBtn');
const nightIdModal = document.getElementById('nightIdModal');

const modalNight = document.getElementById('deleteNightModal');

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
        document.getElementById('noNightFound').style.display = 'none'
    })
    .catch(error => {
        console.error('Error:', error)
        document.getElementById('noNightFound').style.display = 'block'
    });
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

async function putNight(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');

    const movie_id = modalMovie.value;
    const date = modalDate.value;
    const description = modalDescription.value;
    const id = nightIdModal.value;

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
        getUserNight();
    })
    .catch(error => console.error('Error:', error));
}

async function delNight(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');

    const id = modalNight.value;

    fetch(`/api/nights/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getUserNight();
    })
    .catch(error => {
        console.error('Error:', error);
        getUserNight();
    });
}

function generateTableHeader(data) {
    const tableHeader = document.querySelector('#nightsTable thead');
    const headerRow = document.createElement('tr');

    tableHeader.innerHTML = '';

    Object.keys(data[0]).forEach(field => {
        const th = document.createElement('th');
        th.textContent = field;
        headerRow.appendChild(th);
    });

    const editTh = document.createElement('th');
    editTh.textContent = 'Edit';
    headerRow.appendChild(editTh);

    const delTh = document.createElement('th');
    delTh.textContent = 'Delete';
    headerRow.appendChild(delTh);

    tableHeader.appendChild(headerRow);
}

function generateTableBody(data) {
    const tableBody = document.querySelector('#nightsTable tbody');

    tableBody.innerHTML = ''

    data.forEach(rowData => {
        const row = document.createElement('tr');

        Object.values(rowData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        editButton.addEventListener('click', () => createNight(rowData.movie_id, rowData.movie_night_date, rowData.description, rowData.movie_night_id));
        
        const td = document.createElement('td');
        td.appendChild(editButton);
        row.appendChild(td);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteNight(rowData.movie_night_id));
        
        const td2 = document.createElement('td');
        td2.appendChild(deleteButton);
        row.appendChild(td2);

        tableBody.appendChild(row);
    });
}

function createNight(movie_id, date, description, night_id) {
    modalMovie.value = movie_id;
    if(!date === '') {
        modalDate.value = new Date(date);
    }
    modalDescription.value = description;

    if(night_id) {
        modalEditBtn.style.display = 'inline-block';
        modalSaveBtn.style.display = 'none';
        nightIdModal.value = night_id;
    }else {
        modalEditBtn.style.display = 'none';
        modalSaveBtn.style.display = 'inline-block';
    }

    bsnightModal.show();
}

function deleteNight(night_id) {
    modalNight.value = night_id;

    bsdeleteModal.show()
}