'use strict';

const movieSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=8be83258e748b34e88ad002fbe336cd4&query=';
const posterBaseUrl = 'http://image.tmdb.org/t/p/w185/';
const movieIdUrl = 'https://api.themoviedb.org/3/movie/'
const movieIdBaseUrl = 'https://api.themoviedb.org/3/movie/';
const movieApiKey = '?api_key=8be83258e748b34e88ad002fbe336cd4&append_to_response=release_dates';
const movieCreditsEndpoint = '/credits?api_key=8be83258e748b34e88ad002fbe336cd4';
const stockImage = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6';


function waitForClickOnSubmit() {
    $('.search-form').submit(function(event) {
        $('.large-details-container').addClass('hidden');
        $('.outer-content').removeClass('hidden');
        $('.content').html('<p></p>')
        event.preventDefault();
        $('.display-container').removeClass('hidden')
        let searchTerm = $('.search-form').find('input[name="search"').val();
        $('.search-form').find('input[name="search"').val('')
        sendMovieRequest(searchTerm);
    })
};

function sendMovieRequest(movie) {
    $.getJSON(movieSearchUrl + movie, appendMovieData)
}

function appendMovieData(data) {
    let movieResults = (data.results.map(movie => {
        let releaseDate = movie.release_date.slice(0, 4);
        let movieId = movie.id;
        let moviePosterUrl = movie.poster_path;
        if (moviePosterUrl === null) {
            return `<tr class="row">
                        <td class="left-data" data-movieid="${movieId}">
                            <p class="movie-title"><a href="#">${movie.title}</a></p>
                            <p class="release-date">${releaseDate}</p>
                            <p>${movie.overview}</p>
                        </td> 
const stockImage = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6';
<td class="right-data" data-movieid="${movieId}"><img class="stock-img poster-image movie-poster" src="${stockImage}" alt=""></td>
                    </tr>`
        }

        else {
            return `<tr class="row">
                        <td class="left-data" data-movieid="${movieId}">
                            <p class="movie-title"><a href="#">${movie.title}</a></p>
                            <p class="release-date">${releaseDate}</p>
                            <p>${movie.overview}</p>
                        </td> 
                        <td class="right-data" data-movieid="${movieId}"><img class="poster-image movie-poster" src="${posterBaseUrl + movie.poster_path}" alt=""></td>
                    </tr>`
        }
    }));
    $('.content').append(movieResults)
}

function clickOnMovieTitle() {
    $('.content').on('click', '.row', function(event) {
        event.preventDefault();
        $('.outer-content').addClass('hidden')
        let clickedMovieId = $(event.target).closest('td').data('movieid');
        getMovieDetails(clickedMovieId)
    })
}

function getMovieDetails(movieId) {
    let urlMovieApi = movieIdBaseUrl + movieId + movieApiKey;
    let movieCreditsUrl = movieIdBaseUrl + movieId + movieCreditsEndpoint;
    $.when($.getJSON(urlMovieApi), $.getJSON(movieCreditsUrl)).done(function(movieData, creditData) {
        let movieDetailsData = movieData[0];
        let movieCreditData = creditData[0];
        let movieObj = {
            id: movieDetailsData.id,
            title: movieDetailsData.title,
            releaseDate: movieDetailsData.release_date,
            rating: movieDetailsData.vote_average,
            runtime: movieDetailsData.runtime,
            genres: movieDetailsData.genres,
            poster: movieDetailsData.poster_path,
            overview: movieDetailsData.overview,
            production: movieDetailsData.production_companies,
            cast: movieCreditData.cast,
        }
        
        handleMovieDetails(movieObj)
    })
}

function handleMovieDetails(movie) {
    $('.large-details-container').removeClass('hidden');
    let largeMoviePoster;
    if (movie.poster == null) {
        largeMoviePoster = stockImage;
    }
    else {
        largeMoviePoster = 'http://image.tmdb.org/t/p/w342/' + movie.poster;
    }
    // let largeMoviePoster = 'http://image.tmdb.org/t/p/w342/' + movie.poster;
    let movieCast = movie.cast.slice(0, 19).map(function(people) {
        return ' <a href="#"> ' + people.name + '</a>'
    });
    let releaseYear = movie.releaseDate.slice(0, 4)
    let hours = (movie.runtime / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let runtime = rhours + 'h ' + rminutes;
    let movieGenres = movie.genres.map(function(genre) {
        return ' ' + genre.name 
    })
    let productionCompanies = movie.production.map(function(company) {
        return ' ' + company.name
    })

    let detailedTemplate = `
                <div class="top-details-container">
                    <ul class="details-top-row">
                        <li class="movie-name-details"><a href="">${movie.title}</a></li>
                        <li class="movie-year-details">${releaseYear}</li>
                        <li class="movie-rating-details">Fan Rating: ${movie.rating}</li>
                    </ul>
                    <ul class="details-bottom-row">
                        <li class="movie-runtime-details">Runetime: ${runtime}min</li>
                        <li class="movie-category-details">| ${movieGenres}</li>
                        <li class="movie-release-date-details">| ${movie.releaseDate}</li>
                    </ul>
                </div>
                <div class="bottom-left-container">
                    <img class="large-poster" src="${largeMoviePoster}" alt="">
                </div>
                <div class="bottom-right-container">
                    <p class="detail-labels">Overview:</p>
                    <p>${movie.overview}</p>
                    <p class="detail-labels">Producers:</p>
                    <p>${productionCompanies}</p>
                    <p class="detail-labels">Cast:</p>
                    <p>${movieCast}</p>
                </div>`

    $('.large-details-container').html(detailedTemplate);
                
}


$(waitForClickOnSubmit);
$(clickOnMovieTitle);



    


            