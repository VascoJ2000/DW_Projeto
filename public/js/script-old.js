window.onload = getToken();

function show(section) {
    resetUpdate();
    document.getElementById('Consult').style.display = "none";
    document.getElementById('Insert').style.display = "none";
    document.getElementById('Update').style.display = "none";
    document.getElementById('Delete').style.display = "none";
    document.getElementById('Signup').style.display = "none";
    document.getElementById('Login').style.display = "none";

    if(!(section === 'home'))document.getElementById(section).style.display = "block";
    const checkboxes = document.getElementsByClassName('hamburger-checkbox');
    for(let i = 0; i<checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
}

function showForm(form) {
    const forms = document.getElementsByClassName('loggedForm');
    for(let i = 0; i<forms.length; i++){
        forms[i].style.display = "none";
    }
    document.getElementById(form).style.display = "block";
    resetUpdate();
}

function loggedIn(){
    document.getElementById('loginForm').reset();
    document.getElementById('Login').style.display = "none";
    document.getElementById('notlogNav').style.display = "none";
    document.getElementById('logNav').style.display = "block";
    document.getElementById('updateField').style.display = "block";
    document.getElementById('updateText').innerHTML = "<h3>Welcome</h3>";
}

function updateStatus(resetForm, section, message){
    document.getElementById(resetForm).reset();
    document.getElementById(section).style.display = "none";
    document.getElementById('updateText').innerHTML = `<h3>${message}</h3>`;
    document.getElementById('updateField').style.display = "block";
}

function resetUpdate(){
    document.getElementById('updateField').style.display = "none";
    document.getElementById('updateText').innerHTML = "";
    document.getElementById('ConsultView').innerHTML = "";
    document.getElementById('updateLegend').innerHTML = "";
}

function makeTable(data){
    const container = document.getElementById('ConsultView');
    container.innerHTML = '';

    let table = document.createElement('table');
    let cols = Object.keys(data[0]);

    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    cols.forEach((elem) => {
        let th = document.createElement('th');
        th.innerText = elem;
        tr.appendChild(th);
    });
    
    thead.appendChild(tr);
    table.appendChild(thead);
    
    data.forEach((item) => {
        let tr = document.createElement('tr');

        let vals = Object.values(item);

        vals.forEach((elem) => {
            let td = document.createElement('td');
            td.innerText = elem;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    container.appendChild(table);
    document.getElementById('updateField').style.display = "block";
}

// Auth
async function postLogin(){
    const email = document.getElementById('emailLog').value;
    const password = document.getElementById('passwordLog').value;
    await fetch('https://localhost:4000/api/auth/login', {
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
        loggedIn();
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

async function delLogout(){
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return alert('No User is logged in!');
    fetch('https://localhost:4000/api/auth/logout', {
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
    fetch('https://localhost:4000/api/auth/token', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${refreshToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken);
        loggedIn();
    })
    .catch(error => console.error('Error:', error));
}

// User

async function postSignup(){
    const email = document.getElementById('emailReg').value;
    const password = document.getElementById('passwordReg').value;
    const passwordConf = document.getElementById('passwordConf').value;
    if(!(password === passwordConf)) return alert('Passwords do not match!');
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
    const newPassConf = document.getElementById('UPasswordConf').value;
    if(!(newPassword === newPassConf)) return alert('Passwords do not match!');
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


// Income

async function getUserIncomes(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/income', {
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

async function getIncome(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/income', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => {response.json()})
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

async function postIncome(){
    const newAmount = document.getElementById('IIncomesAmount').value;
    const newCategory = document.getElementById('IIncomesCategory').value;
    const newDate = document.getElementById('IIncomesDate').value;
    const newDescription = document.getElementById('IIncomesDescription').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    const amount = newAmount === "" ? false : newAmount;
    const category = newCategory === "" ? false : newCategory;
    //const date = newDate === "" ? new Date() : newDate;
    const description = newDescription === "" ? false : newDescription;
    fetch('/api/income', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            amount: amount,
            category: category,
            //date: date,
            description: description
         })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('IIncomesForm', 'Insert', "Income added successfully");
    })
    .catch(error => console.error('Error:', error));
}

async function putIncome(){
    const id = document.getElementById('UIncomesID').value;
    const newAmount = document.getElementById('UIncomesAmount').value;
    const newCategory = document.getElementById('UIncomesCategory').value;
    const newDate = document.getElementById('UIncomesDate').value;
    const newDescription = document.getElementById('UIncomesDescription').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    const amount = newAmount === "" ? false : newAmount;
    const category = newCategory === "" ? false : newCategory;
    //const date = newDate === "" ? false : newDate;
    const description = newDescription === "" ? false : newDescription;
    fetch(`/api/income/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            amount: amount,
            category: category,
            //date: date,
            description: description
         })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('UIncomesForm', 'Update', "Income updated successfully");
        
    })
    .catch(error => console.error('Error:', error));
}

async function delIncome(){
    const id = document.getElementById('DIncomesID').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch(`/api/income${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('DIncomesForm', 'Delete', "Income deleted successfully");
    })
    .catch(error => {
        console.error('Error:', error);
        updateStatus('DIncomesForm', 'Delete', "Income deleted successfully");
    });
}

// Expenses

async function getUserExpenses(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/expenses', {
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

async function getExpense(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch('/api/expenses', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

async function postExpense(){
    const newAmount = document.getElementById('IExpensesAmount').value;
    const newCategory = document.getElementById('IExpensesCategory').value;
    const newDate = document.getElementById('IExpensesDate').value;
    const newDescription = document.getElementById('IExpensesDescription').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    const amount = newAmount === "" ? false : newAmount;
    const category = newCategory === "" ? false : newCategory;
    //const date = newDate === "" ? new Date() : newDate;
    const description = newDescription === "" ? false : newDescription;
    fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            amount: amount,
            category: category,
            //date: date,
            description: description
         })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('IExpensesForm', 'Insert', "Expense added successfully");
    })
    .catch(error => console.error('Error:', error));
}

async function putExpense(){
    const id = document.getElementById('UExpensesID').value;
    const newAmount = document.getElementById('UExpensesAmount').value;
    const newCategory = document.getElementById('UExpensesCategory').value;
    const newDate = document.getElementById('UExpensesDate').value;
    const newDescription = document.getElementById('UExpensesDescription').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    const amount = newAmount === "" ? false : newAmount;
    const category = newCategory === "" ? false : newCategory;
    //const date = newDate === "" ? false : newDate;
    const description = newDescription === "" ? false : newDescription;
    fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            amount: amount,
            category: category,
            //date: date,
            description: description
         })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('UExpensesForm', 'Update', "Expense updated successfully");
    })
    .catch(error => console.error('Error:', error));
}

async function delExpense(){
    const id = document.getElementById('DExpensesID').value;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('No User is logged in!');
    fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateStatus('DExpensesForm', 'Delete', "Expense deleted successfully");
    })
    .catch(error => {
        console.error('Error:', error);
        updateStatus('DExpensesForm', 'Delete', "Expense deleted successfully");
    });
}

