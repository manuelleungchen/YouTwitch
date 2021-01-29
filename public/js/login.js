const loginFormEl = document.querySelector('#login_form');
const loginInputEmailEl = document.querySelector('#login_input_email');
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

  fetch('/api/login', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  }).then(() => {
    loginInputEmailEl.value = '';
    loginInputPasswordEl.value = '';
    window.location.replace('/members');
  })
    // eslint-disable-next-line
    .catch((err) => console.log(err));
});
