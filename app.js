
const movieListEl = document.querySelector('.movie-list');
const movieSearch = localStorage.getItem('movieSearch');
let filter = '';

// index page.

function showMovie(event) {
    localStorage.setItem('movieSearch', event.target.value);
    window.location.href = `./movies.html`;
    // window.location.href = `${window.location.origin}/movies.html`;
}

// movie page

function openMenu() {
    document.body.classList += ' menu--open';
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}

function onSearchChange(event) {
    localStorage.setItem('movieSearch', event.target.value);
    getMovies(event.target.value, filter);
}

function filterMovie(event) {
    const movieSearch = localStorage.getItem('movieSearch');
    getMovies(movieSearch, event.target.value);
}

// let pageLoading = false

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
    return `<div class="movie-list__wrapper"  onclick="showMovieDetail('${movie.imdbID}')">
                <div class='search__img--wrapper'>
                    <img class='search__movie--img' src="${movie.Poster}"
                        alt="Movie Poster">
                    <div class="movie__cover--info">
                    <h1 class='movie__more--info'>MORE INFO</h1>
                    </div>
                </div>
                <h1 class="search__movie-title">${movie.Title}</h1>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
        </div>`
}

// 
//   movie detail page.
// 


const movieDetailEl = document.querySelector('.movie');
const movieDetail = localStorage.getItem("movieDetail")

function showMovieDetail(imdbID) {
    window.location.href = `./moviedetails.html`;
    // window.location.href = `${window.location.origin}/moviedetails.html`;
    localStorage.setItem('movieDetail', imdbID);
}

async function movieDetails(movie) {
    const moviePromise = await fetch(`https://www.omdbapi.com/?apikey=aafd31ec&i=${movie}`);
    const movieDetailsData = await moviePromise.json();
    movieDetailEl.innerHTML = movieDetailHTML(movieDetailsData);
}

movieDetails(movieDetail);

function movieDetailHTML(movie) {
    return `<div class="movie__details">
    <figure>
        <img class='movie__detail--img' src="${movie.Poster}"
            alt="Movie Poster">
    </figure>
    <div class="movie__detail--wrapper">
        <h1 class="search__movie-title">Title: ${movie.Title}</h1>
        <p><strong>Year</strong>: ${movie.Year}</p>
        <p><strong>Rated</strong>: ${movie.Rated}</p>
        <p><strong>Released</strong>: ${movie.Released}</p>
        <p><strong>Runtime</strong>: ${movie.Runtime}</p>
        <p><strong>Genre</strong>: ${movie.Genre}</p>
        <p><strong>Director</strong>: ${movie.Director}</p>
        <p><strong>Writer</strong>: ${movie.Writer}</p>
        <p><strong>Actors</strong>: ${movie.Actors}</p>
        <p><strong>Plot</strong>: ${movie.Plot}</p>
        <p><strong>Language</strong>: ${movie.Language}</p>
        <p><strong>Country</strong>: ${movie.Country}</p>
        <p><strong>Awards</strong>: ${movie.Awards}</p>
    </div>
</div>`
}
