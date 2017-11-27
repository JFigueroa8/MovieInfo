$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    //console.log(searchText);
    getMovies(searchText);
    e.preventDefault();
  })
});

// function that searches omdb using the users input
function getMovies(searchText){
$.ajax("http://www.omdbapi.com/?apikey=7564f16b&s=" + searchText).done((response) => {
  let output = '';
  //create a unique list of movies with no duplicates
  let uniq = new Set(response.Search.map(movie => JSON.stringify(movie)));

  //parse the stringified uniq list of movies
  let movies = Array.from(uniq).map(movie => JSON.parse(movie));

  $.each(movies, (index, movie) => {
    //only list movies that have posters
    if (movie.Poster !== "N/A") {
    output += `
      <div class="col-md-4">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
    `;
    }
  });
  $('#movies').html(output);
 }).fail((error) => {
   console.log(error);
 });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

// function that populates the movies information and plot
function getMovie() {
  let movieId = sessionStorage.getItem('movieId');


  $.ajax("http://www.omdbapi.com/?apikey=7564f16b&i=" + movieId).done((response) => {
    console.log(response);
    let movie = response;
    let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}">
        </div>
        <div class="col-md-6">
          <h2 class="text-center">${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well test">
          <h3>Plot</h3>
          <p>${movie.Plot}</p>
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-primary">Back To Search</a>
        </div>
      </div>
    `;
    $("#movie").html(output);
   }).fail((error) => {
     console.log(error);
   });
}