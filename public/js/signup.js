const createformEl = document.querySelector('#signUp'); //Change this to the signup correct id or class
const createInputEmailEl = document.querySelector('#email-input'); //Change this to the signup correct id or class
const createInputPasswordEl = document.querySelector('#password-input'); //Change this to the signup correct id or class
console.log("Email: ",createInputEmailEl.value);
console.log("Password: ",createInputPasswordEl.value);
createformEl.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log("Initial log for signup.js");
    const newUser = {
        email: createInputEmailEl.value.trim(),
        password: createInputPasswordEl.value.trim()
    };
    console.log(newUser);
    if(!newUser.email || !newUser.password) {
        return;
    }
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(()=> {
        // window.location.replace('/members');
        console.log(newUser)
    })
})