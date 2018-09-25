$("#filter").click(function() {
  displayMovies();
});

function getTopRated(array) {
  let h = "";
  let top_movie = array[0];
  let date = new Date(top_movie.release_date);

  for (let i = 0; i < array.length; i++) {
    if (array[i].popularity > top_movie.popularity) {
      top_movie = array[i];
      date = new Date(top_movie.release_date);
    }
    date = new Date(top_movie.release_date);
  }
  h +=
    "<img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
    top_movie.poster_path +
    ">";
  h += "<h2>" + top_movie.title + "</h2>";
  h +=
    "<h2>" + date.getFullYear() + "</h2>" + "<p>" + top_movie.overview + "</p>";

  $("#top_film").html(h);
}

function displayMovies() {
  let h = "";
  let popular_movies = [];
  let filterYear = $("#year_select").val();
  let year = JSON.stringify(new Date(filterYear).getFullYear());

  if (filterYear == "") {
    popular_movies = movies;
    getTopRated(popular_movies);
  } else {
    popular_movies = movies.filter(function(filmas) {
      let movie_date = new Date(filmas.release_date);
      return movie_date.getFullYear() == year;
    });
    getTopRated(popular_movies);
  }
  for (let i = 0; i < popular_movies.length; i++) {
    let movie = popular_movies[i];
    let date = new Date(popular_movies[i].release_date);

    if ($("#all_films").css({ display: "none" })) {
      $("#all_films").css({ display: "block" });
    }

    h +=
      "<div class='row'><div class='col-6'><img src=https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
      movie.poster_path +
      "></div>";
    h += "<div class='col-6'><h2>" + movie.title + "</h2>";
    h += "<p>" + movie.overview + "</p></div></div><br>";
    h += "<div class='border_line'></div>";
  }
  $(".background").css({ height: "100%" });
  $("#all_films").html(h);
}
