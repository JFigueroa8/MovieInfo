$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
     let searchText = $('#searchText').val();
     //console.log(searchText);
     getMovies(searchText);
     e.preventDefault();
   })
});

function getMovies(searchText) {
  axios.get("http://www.omdbapi.com/?apikey=7564f16b&s=" + searchText)
  .then((response) => {
      alert(response);
    })
    .catch((err) => {
      console.log(err);
    });
}


/* working code
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
 // assign data stored in response to movieObj
 //moviesObj = response;
 response.Search.forEach((movie) => {
   console.log(movie);
 });
 // invoke getMovies which will then have access to moviesObj new value
 //getMovies();
 }).fail((error) => {
   console.log(error);
 });
}
*/