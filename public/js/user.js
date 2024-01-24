async function postSignup(){
    const email = document.getElementById('usernameSignup').value;
    const password = document.getElementById('senhaSignup').value;
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        updateStatus('signupForm', 'Signup', "U have signed in sucessfully. Login to access your account.")
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

async function getUser(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        makeTable(data);
    })
    .catch(error => console.error('Error:', error));
}

async function putUser(){
    const newEmail = document.getElementById('UEmail').value;
    const newPassword = document.getElementById('UPassword').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    const email = newEmail === "" ? false : newEmail;
    const password = newPassword === "" ? false : newPassword;
    fetch('/api/user', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email,
            password: password
         })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('UUserForm', 'Update', "User info updated successfully");
    })
    .catch(error => console.error('Error:', error));
}

async function delUser(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/user', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        location.reload();
        console.log(data);
    })
    .catch(error => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        location.reload();
        console.error('Error:', error);
    });
}