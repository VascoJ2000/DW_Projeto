window.onload = getToken();

const url = 'https://localhost:4000'

function login() {
    const notLogged = document.getElementsByClassName('loggedOut');
    const logged = document.getElementsByClassName('loggedIn');

    for(let i = 0; i<notLogged.length; i++){
        notLogged[i].style.display = "none";
    }

    for(let i = 0; i<logged.length; i++){
        logged[i].style.display = "block";
    }
}

function logoff() {
    location.reload();
}

// Auth
async function postLogin(){
    const email = document.getElementById('usernameLogin').value;
    const password = document.getElementById('senhaLogin').value;
    await fetch(url + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        login();
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

async function delLogout(){
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return alert('No User is logged in!');
    fetch(url + '/api/auth/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${refreshToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        location.reload();
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        location.reload();
    });
}

async function getToken(){
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return console.log('No token');
    fetch(url + '/api/auth/token', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${refreshToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken);
        login();
    })
    .catch(error => console.error('Error:', error));
}