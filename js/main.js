$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    //console.log(searchText);
    getMovies(searchText);
    e.preventDefault();
  })
});

function getMovies(searchText){
$.ajax("http://www.omdbapi.com/?apikey=7564f16b&s=" + searchText).done((response) => {
  let movies = response.Search;
  let output = '';
  $.each(movies, (index, movie) => {
    output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
    `;
  });
  $('#movies').html(output);
 }).fail((error) => {
   console.log(error);
 });
}
