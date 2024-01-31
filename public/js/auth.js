const url = 'https://localhost:4000'

function login(email) {
    const notLogged = document.getElementsByClassName('loggedOut');
    const logged = document.getElementsByClassName('loggedIn');
    const navEmail = document.getElementById('userLogged');

    for(let i = 0; i<notLogged.length; i++){
        notLogged[i].style.display = "none";
    }

    for(let i = 0; i<logged.length; i++){
        logged[i].style.display = "block";
    }
    navEmail.innerHTML = email
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
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        login(data.email);
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

async function delLogout(){
    const refreshToken = sessionStorage.getItem('refreshToken');
    if(!refreshToken) return alert('No User is logged in!');
    fetch(url + '/api/auth/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${refreshToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        location.reload();
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        location.reload();
    });
}

async function getToken(){
    const refreshToken = sessionStorage.getItem('refreshToken');
    if(!refreshToken) return console.log('No token');
    fetch(url + '/api/auth/token', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${refreshToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        sessionStorage.setItem('accessToken', data.accessToken);
        login(data.email);
    })
    .catch(error => console.error('Error:', error));
}

window.onload = getToken();