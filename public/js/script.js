const modalLogin = document.getElementById("modalLogin");
const bsModalLogin = new bootstrap.Modal(modalLogin, (backdrop = "static")); // Pode passar opções
const modalSignup = document.getElementById("modalSignup");
const bsModalSignup = new bootstrap.Modal(modalSignup, (backdrop = "static")); // Pode passar opções

const btnSignup = document.getElementById('btnNavSignup');
const btnLogin = document.getElementById('btnNavLogin');
const btnLogout = document.getElementById('btnNavLogout');

btnSignup.addEventListener('click', () => {
    bsModalSignup.show()
});

btnLogin.addEventListener('click', () => {
    bsModalLogin.show()
});

pSignup.addEventListener("click", () => {
    bsModalLogin.hide()
    bsModalSignup.show()
});

pLogin.addEventListener("click", () => {
    bsModalSignup.hide()
    bsModalLogin.show()
});

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

window.addEventListener('scroll', () => {
    if(window.scrollY > 5){
        document.getElementById('navbar').classList.add('solid');
        document.getElementById('navbar').classList.add('bg-dark');
    }else {
        document.getElementById('navbar').classList.remove('solid');
        document.getElementById('navbar').classList.remove('bg-dark');
    }
});