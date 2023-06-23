const global = {
    currentPage: window.location.pathname
}

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('#search-term')
const nav = document.querySelector('nav')

// Highlight active link
const highlightActiveLink = () => {
    nav.querySelectorAll('a').forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}



// Init App
const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;

    }

    highlightActiveLink()
}


document.addEventListener('DOMContentLoaded', init)