'use strict';

const movieKey = 'https://api.themoviedb.org/3/search/movie?api_key=8be83258e748b34e88ad002fbe336cd4&query=';
const posterBaseUrl = 'http://image.tmdb.org/t/p/w185/'

function waitForClickOnSubmit() {
    $('.search-form').submit(function(event) {
        $('.content').html('<p></p>')
        event.preventDefault();
        $('.display-container').removeClass('hidden')
        let searchTerm = $('.search-form').find('input[name="search"').val();
        $('.search-form').find('input[name="search"').val('')
        sendRequest(searchTerm);
    })
};

function sendRequest(movie) {
    $.getJSON(movieKey + movie, handleData)
}

function handleData(data) {
    console.log(data.results)
    let movieResults = (data.results.map(movie => {
        let releaseDate = movie.release_date.slice(0, 4);
        console.log(releaseDate)
        let moviePosterUrl = movie.poster_path;
        if (moviePosterUrl === null) {
            return `<tr>
                        <td>
                            <p class="movie-title"><a class="title-link" href="#">${movie.title}</a></p>
                            <p class="release-date">${releaseDate}</p>
                            <p>${movie.overview}</p>
                        </td> 
                        <td><img class="stock-img movie-poster" src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6" alt=""></td>
                    </tr>`
        }

        else {
            return `<tr>
                        <td>
                            <p class="movie-title"><a class="title-link" href="#">${movie.title}</a></p>
                            <p class="release-date">${releaseDate}</p>
                            <p>${movie.overview}</p>
                        </td> 
                        <td><img class="poster-image movie-poster" src="${posterBaseUrl + movie.poster_path}" alt=""></td>
                    </tr>`
        }
    }));
    $('.content').append(movieResults)
}


$(waitForClickOnSubmit)



    


            