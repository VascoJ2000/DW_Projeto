const userSection = document.getElementById('user');

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
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

async function getUser(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        userInfo(data[0])
    })
    .catch(error => console.error('Error:', error));
}

async function putUser(){
    const newEmail = document.getElementById('UEmail').value;
    const newPassword = document.getElementById('UPassword').value;
    const accessToken = sessionStorage.getItem('accessToken');
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
    const accessToken = sessionStorage.getItem('accessToken');
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

async function getFriendlist(){
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/user/friendlist/names', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        friendlistInfo(data);
    })
    .catch(error => console.error('Error:', error));
}

async function delFriend(inputId){
    const removeId = document.getElementById(inputId).value;
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch(`/api/user/friendlist/${removeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getFriendlist();
    })
    .catch(error => {
        console.error('Error:', error);
        getFriendlist();
    });
}

async function postFriend(inputId){
    const addId = document.getElementById(inputId).value;
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/user/friendlist', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            friend_id: addId
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        friendlistInfo(data);
    })
    .catch(error => console.error('Error:', error));
}

function userInfo(data) {
    userSection.innerHTML = `
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-8">
                    <h3>User:</h3>
                    <p><b>ID:</b> ${data.user_id}</p>
                    <p><b>Email:</b> ${data.email}</p>
                    <p><b>Role:</b> ${data.role}</p>
                </div>
                <div class="col-md-4" id='friendlist'>
                    <h3>Friendlist:</h3>
                </div>
            </div>
        </div>
    `;
    getFriendlist();
}

function friendlistInfo(data) {
    const friendlist = document.getElementById('friendlist');
    if(data.length === 0) {
        const f = document.createElement('div');
        f.className = 'col-md-8';
        f.innerHTML = `
            <h4>No friends found!</h4>
        `;
        friendlist.appendChild(f);
    }
    data.forEach(friend => {
        const f = document.createElement('div');
        f.className = 'col-md-8 border';
        f.innerHTML = `
            <p><b>ID:</b> ${friend.friend_id}</p>
            <p><b>Email:</b> ${friend.email}</p>
        `;
        friendlist.appendChild(f);
    });
    const friendNav = document.createElement('div');
    friendNav.innerHTML = `
        <div>
            <input type="number" id="addFriend" placeholder="ID"/>
            <button type="button" class="btn btn-primary me-2" onclick="postFriend('addFriend')">Add Friend:</button>
        </div>
        <div>
            <input type="number" id="removeFriend" placeholder="ID"/>
            <button type="button" class="btn btn-danger me-2" onclick="delFriend('removeFriend')">Remove Friend</button>
        </div>
    `;
    friendlist.appendChild(friendNav);
}