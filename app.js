const movieListEl = document.querySelector('.movie-list')
const movieSearch = localStorage.getItem('movieSearch');

// index page.

function showMovie(event) {
    event.preventDefault();
    const movieSearch = event.target.value
    localStorage.setItem('movieSearch', movieSearch);
    window.location.href = `${window.location.origin}/movies.html`;
}

// movie page

function openMenu() {
    document.body.classList += ' menu--open';
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}

function onSearchChange(event) {
    getMovies(event.target.value);
}

function filterMovie(event) {
    getMovies(movieSearch, event.target.value);
}

let pageLoading = false

async function getMovies(search, filter) {
    const moviePromise = await fetch(`https://www.omdbapi.com/?apikey=aafd31ec&s=${search}`)
    const movieData = await moviePromise.json();

    if (filter === "OLD_TO_NEW") {
        movieData.Search.sort((a, b) => (a.Year - b.Year))
    }
    else if (filter === "NEW_TO_OLD") {
        movieData.Search.sort((a, b) => (b.Year - a.Year))
    }

    movieListEl.innerHTML = movieData.Search.filter((elem, index) => index < 6).map((elem) => movieHTML(elem)).join('')
}

setTimeout(() => {
    getMovies(movieSearch);
  }, 2000);

function movieHTML(movie) {
    return `<div class="movie-list__wrapper">
                <div class='search__img--wrapper'>
                    <img class='search__movie--img' src="${movie.Poster}"
                        alt="Movie Poster">
                    <div class="movie__cover--info">
                    <h1 class='movie__more--info'>MORE INFO</h1>
                    </div>
                </div>
                <h1 class="search__movie-title">${movie.Title}</h1>
                <p>Year: ${movie.Year}</p>
                <p>ID: ${movie.imdbID}</p>
                <p>Type: ${movie.Type}</p>
        </div>`
}