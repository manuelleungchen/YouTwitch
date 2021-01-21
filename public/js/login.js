const loginFormEl = document.querySelector("#login_form")
const loginInputEmailEl = document.querySelector("#login_input_email");
const loginInputPasswordEl = document.querySelector('#login_input_password');

loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLogin = {
        email: loginInputEmailEl.value.trim(),
        password: loginInputPasswordEl.value.trim(),
    };

    if (!userLogin.email || !userLogin.password) {
        return;
    }
    console.log(userLogin);

    fetch('/api/login', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
    }).then(() => {
        loginInputEmailEl.value = '';
        loginInputPasswordEl.value = '';
        window.location.replace('/members')
    })
    .catch(err => console.log(err));
})