const createformEl = document.querySelector('.signup');
const createInputEmailEl = document.querySelector("#email-input");
const createInputPasswordEl = document.querySelector("#password-input");

createformEl.addEventListener('submit', (e)=> {
    e.preventDefault();
    const newUser = {
        email: createInputEmailEl.value.trim(),
        password: createInputPasswordEl.value.trim()
    };
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
});
