const global = {
    currentPage: window.location.pathname,
    search: {
        active: false,
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0
    },
    api: {
        apiKey: `957a040f71125324ca2dff71b91cdb3d`,
        apiURI: `https://api.themoviedb.org/3`
    }
}

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('#search-term')
const nav = document.querySelector('nav')
const popularMovies = document.querySelector('#popular-movies')
const popularShows = document.querySelector('#popular-shows')
const swiperWrapper = document.querySelector('.swiper-wrapper')

const getID = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // '42'
    return id
}
// Fetch from TMDB API
const fetchAPIData = async (endpoint) => {


    showSpinner()

    const res = await fetch(`${global.api.apiURI}${endpoint}?api_key=${global.api.apiKey}&language=en-US`)
    const data = await res.json()

    setTimeout(() => {
        hideSpinner()
    }, 500)

    return data
}


const searchAPIData = async () => {

    showSpinner()

    const res = await fetch(`${global.api.apiURI}/search/${global.search.type}?api_key=${global.api.apiKey}&language=en-US&query=${global.search.term}&page=${global.search.page}`)
    const data = await res.json()

    setTimeout(() => {
        hideSpinner()
    }, 500)

    return data
}

const getPopularMovies = async () => {
    const { results } = await fetchAPIData('/movie/popular')

    results.forEach((movie) => {

        const div = document.createElement('DIV')
        div.classList.add('card')
        div.innerHTML = ` <a href="movie-details.html?id=${movie.id}">
        
        ${movie.poster_path
                ?
                `
                <img
                    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
                :
                `<img
                    src="./images/no-image"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
            }
      </a >
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>`
        popularMovies.appendChild(div)
    })
}

const displayMovieDetails = async () => {
    // Get the ID from the URI
    const id = getID()

    const movie = await fetchAPIData(`/movie/${id}`)
    // console.log(movie)
    const div = document.createElement('DIV')

    addBackDrop('movie', movie.backdrop_path)

    div.innerHTML = `
    <div class="details-top">
    <div>
    ${movie.poster_path
            ?
            `
        <img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
        />`
            :
            `<img
            src="./images/no-image"
            class="card-img-top"
            alt="${movie.title}"
        />`
        }
   
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
      ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies.map((company) => company.name).join(', ')}
    </div>
  </div>
    
    `

    document.querySelector('#movie-details').appendChild(div)


}

const getPopularShows = async () => {
    const { results } = await fetchAPIData('/tv/popular')

    results.forEach((show) => {

        const div = document.createElement('DIV')
        div.classList.add('card')
        div.innerHTML = ` <a href="tv-details.html?id=${show.id}">
        
        ${show.poster_path
                ?
                `
                <img
                    src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                />`
                :
                `<img
                    src="./images/no-image"
                    class="card-img-top"
                    alt="${show.name}"
                />`
            }
      </a >
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${show.first_air_date}</small>
                </p>
            </div>`
        popularShows.appendChild(div)
    })
}

const displayShowDetails = async () => {
    // Get the ID from the URI
    const id = getID()

    const show = await fetchAPIData(`/tv/${id}`)

    const div = document.createElement('DIV')

    addBackDrop('show', show.backdrop_path)

    div.innerHTML = `

    <div class="details-top">
    <div>
    ${show.poster_path
            ?
            `
    <img
        src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
    />`
            :
            `<img
        src="./images/no-image"
        class="card-img-top"
        alt="${show.name}"
    />`
        }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">First Air Date: ${show.first_air_date}</p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
       ${show.overview ? show.overview
            :
            `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, autem. Minus consequuntur at optio iure magni. Deleniti tempore veritatis aliquam quaerat modi, atque autem possimus.</p>`
        }
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
       ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
    </li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies.map((company) => company.name).join(', ')}
    </div>
  </div>`



    document.querySelector('#show-details').appendChild(div)


}


const search = async () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type')
    const term = params.get('search-term')

    global.search.term = term
    global.search.type = type

    if (global.search.term !== '' && global.search.term !== null) {
        // @todo - make request and display results
        const { results, total_pages, page, total_results } = await searchAPIData()
        console.log(results);

        global.search.active = true
        global.search.page = page
        global.search.totalPages = total_pages
        global.search.totalResults = total_results


        // Show results in UI
        if (results.length === 0) {
            showAlert('No results found', 'alert-error')
        }

        displaySearchResults(results)

        document.querySelector('#search-term').value = ''
    } else {
        // Show Alert
        showAlert('Please enter a search term', 'alert-error')
    }

}


const displaySearchResults = (results) => {

    // Clear Previous Results
    document.querySelector('#search-results').innerHTML = ''
    document.querySelector('#search-results-heading').innerHTML = ''
    document.querySelector('#pagination').innerHTML = ''

    results.forEach((result) => {

        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = ` <a href="${global.search.type}-details.html?id=${result.id}">
        
        ${result.poster_path
                ?
                `
                <img
                    src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                    class="card-img-top"
                    alt="${global.search.type === 'movie' ? result.title : result.name}"
                />`
                :
                `<img
                    src="./images/no-image"
                    class="card-img-top"
                    alt="${global.search.type === 'movie' ? result.title : result.name}"
                />`
            }
      </a >
            <div class="card-body">
                <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
                <p class="card-text">
                ${global.search.type === 'movie' ?
                `<small class="text-muted">Release: ${result.release_date}</small>` :
                `<small class="text-muted">First Air Date: ${result.first_air_date}</small>`} 
                   
                    
                </p>
            </div>`

        document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
            
            `
        document.querySelector('#search-results').appendChild(div)
    })

    displayPagination()


}


const displayPagination = () => {
    const div = document.createElement('div')
    div.classList.add('pagination')
    div.innerHTML = `
<button class="btn btn-primary" id="prev">Prev</button>
<button class="btn btn-primary" id="next">Next</button>
<div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
`

    document.querySelector('#pagination').appendChild(div)

    // Disable Prev Button if On 1st Page
    if (global.search.page === 1) {
        document.querySelector('#prev').disabled = true
    }

    // Disable Next Button if On Last Page
    if (global.search.page === global.search.totalPages) {
        document.querySelector('#next').disabled = true
    }

    // Next Page
    document.querySelector('#next').addEventListener('click', async () => {
        // Increment Global Page
        global.search.page += 1

        const { results, total_pages } = await searchAPIData()
        displaySearchResults(results)
    })

    // Prev Page
    document.querySelector('#prev').addEventListener('click', async () => {
        // Increment Global Page
        global.search.page -= 1

        const { results, total_pages } = await searchAPIData()
        displaySearchResults(results)
    })


}
const displaySlider = async () => {
    const { results } = await fetchAPIData('/movie/now_playing')
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
          </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);


    });
    initSwiper();

}


const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    })
}

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show')
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}

const showAlert = (message, className) => {
    const alertEl = document.createElement('div')
    alertEl.classList.add('alert')
    alertEl.classList.add(className)
    alertEl.appendChild(document.createTextNode(message))
    document.querySelector('#alert').appendChild(alertEl)

    setTimeout(() => {
        alertEl.remove()
    }, 3000)
}

const addBackDrop = (type, path) => {


    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// Highlight active link
const highlightActiveLink = () => {
    nav.querySelectorAll('a').forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

const addCommasToNumber = (number) => {

    return number.toLocaleString();
}


// Init App
const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider()
            getPopularMovies()
            break;
        case '/shows.html':
            getPopularShows()
            break;
        case '/movie-details.html':
            displayMovieDetails()
            break;
        case '/tv-details.html':
            displayShowDetails()
            break;
        case '/search.html':
            search()
            break;

    }

    highlightActiveLink()


}


document.addEventListener('DOMContentLoaded', init)