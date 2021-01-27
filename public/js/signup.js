<<<<<<< HEAD
const createformEl = document.querySelector('#signUp'); //Change this to the signup correct id or class
const createInputEmailEl = document.querySelector('#email-input'); //Change this to the signup correct id or class
const createInputPasswordEl = document.querySelector('#password-input'); //Change this to the signup correct id or class
console.log("Email: ",createInputEmailEl.value);
console.log("Password: ",createInputPasswordEl.value);
createformEl.addEventListener('click', (e)=> {
    e.preventDefault();
    console.log("Initial log for signup.js");
=======
const createformEl = document.querySelector('.signup');
const createInputEmailEl = document.querySelector("#email-input");
const createInputPasswordEl = document.querySelector("#password-input");

createformEl.addEventListener('submit', (e)=> {
    e.preventDefault();
>>>>>>> develop
    const newUser = {
        email: createInputEmailEl.value.trim(),
        password: createInputPasswordEl.value.trim()
    };
<<<<<<< HEAD
    console.log(newUser);
    if(!newUser.email || !newUser.password) {
        return;
    }
=======
    if(!newUser.email || !newUser.password) {
        return;
    }


>>>>>>> develop
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
<<<<<<< HEAD
})
=======
});
>>>>>>> develop
