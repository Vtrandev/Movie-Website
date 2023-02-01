const movieListEl = document.querySelector('.movie-list')
const search = localStorage.getItem('search');

function onSearchChange(event) {
    const search = event.target.value;
    getMovies(search);
}


async function getMovies(search) {
    const promise = await fetch(`http://www.omdbapi.com/?apikey=aafd31ec&s=${search}`)
    // const promise = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const result = await promise.json();

    movieListEl.innerHTML = result.Search.map((elem) => movieHTML(elem))
}

function movieHTML(movie) {
    return `<div class="movie-list__wrapper">
    <figure>
        <img src="${movie.Poster}"
            alt="">
    </figure>
    <h1>Title: ${movie.Title}</h1>
    <p>Year: ${movie.Year}</p>
    <p>ID: ${movie.imdbID}</p>
    <p>Type: ${movie.Type}</p>
    </div>`
}

getMovies('hello');