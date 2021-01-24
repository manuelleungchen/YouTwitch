const searchVideoEl = document.querySelector('#searchVideo');
searchVideoEl.addEventListener('keypress', (e)=> {
    const videoInfo ={
        query: searchVideoEl.value.trim()
    }
    if(e.key === 'Enter') {

        window.location.replace(`/members/${searchVideoEl.value.trim()}`);

    }
});

$(document).ready(() => {
    $('.modal').modal();
})