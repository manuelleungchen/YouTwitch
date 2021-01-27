const searchFormEl = document.querySelector('#search_form')
const searchVideoEl = document.querySelector('#searchVideo');
searchFormEl.addEventListener('submit', (e)=> {
    e.preventDefault();
    const videoInfo ={
        query: searchVideoEl.value.trim()
    }

    if(!videoInfo.query) {
        return;
    }

    window.location.replace(`/members/${videoInfo.query}`);
})
