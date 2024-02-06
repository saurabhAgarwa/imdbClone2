const arr = JSON.parse(localStorage.getItem('arri')) || [];
console.log(arr.length);
















// Function to display movie details in a new tab
function displayMovieDetails(imdbId) {
    // Fetch movie details by IMDb ID
    fetchMovieById(imdbId)
        .then(function(movie) {
            // Clear the container
            const backgroundMoviesCard = document.querySelector(".backgroundMoviesCard");
            backgroundMoviesCard.innerHTML = "";

            // Create a new big card to display movie details
            const bigCard = document.createElement('div');
            bigCard.classList.add('big-card');

            // Create a div for poster
            const posterDiv = document.createElement('div');
            posterDiv.classList.add('poster');
            const posterImage = document.createElement('img');
            posterImage.src = movie.Poster;
            posterDiv.appendChild(posterImage);

            // Create a div for other details
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');
            const title = document.createElement('h2');
            title.textContent = `${movie.Title} (${movie.Year})`;
            const plot = document.createElement('p');
            plot.innerHTML = `<strong>Plot:</strong> ${movie.Plot}`;
            const director = document.createElement('p');
            director.innerHTML = `<strong>Director:</strong> ${movie.Director}`;
            const actors = document.createElement('p');
            actors.innerHTML = `<strong>Actors:</strong> ${movie.Actors}`;
            detailsDiv.appendChild(title);
            detailsDiv.appendChild(plot);
            detailsDiv.appendChild(director);
            detailsDiv.appendChild(actors);

            // Append poster and other details divs to the big card
            bigCard.appendChild(posterDiv);
            bigCard.appendChild(detailsDiv);

            // Append big card to the container
            backgroundMoviesCard.appendChild(bigCard);
        })
        .catch(function(error) {
            console.error("Error fetching movie details:", error);
        });
}



























function displayPoster(array) {
  
    const backgroundMoviesCard = document.querySelector(".backgroundMoviesCard");
    backgroundMoviesCard.innerHTML="";

    for(let i=0;i<array.length;i++){
      
        if (array.length === 0 || !array[i].Poster) {
            console.error("Poster data not available.");
            return;
        }
    
        const imdbIds=array[i].imdbID;
        const PosterImage = array[i].Poster;

        // const backgroundCard=document.querySelector(".backgroundMoviesCard");
        // backgroundCard.innerHTML=""

        
    
        const outerCard = document.createElement('div');
        outerCard.classList.add('outer-card');
        
    
    
        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${PosterImage})`;

        card.addEventListener('click', function() {
            displayMovieDetails(imdbIds);
        });
    
        // Append card to outer-card
        outerCard.appendChild(card);
    
        // Create button
        const button = document.createElement('button');
        button.classList.add('btn');

       
        if(arr.indexOf(imdbIds)==-1){
               
            button.textContent = 'Add to favorite';
          

        }else{

         
            button.textContent='remove form favorite';
           
           
        }
       
    
        // Append button to outer-card
        outerCard.appendChild(button);
       
    
        // Append outer-card to the body or any desired parent element
      
        if (backgroundMoviesCard) {
            backgroundMoviesCard.appendChild(outerCard);
        } else {
            console.error(".backgroundMoviesCard not found.");
        }
    
        button.addEventListener('click', function() {

          

            if(arr.indexOf(imdbIds)!=-1){
               
                button.textContent = 'Add to favorite';
                arr.splice(arr.indexOf(imdbIds), 1);
    

            }else{

                arr.push(imdbIds);
                button.textContent='remove form favorite';
               
               
            }
            
            localStorage.setItem('arri', JSON.stringify(arr));
            console.log(imdbIds);
            console.log(arr.length);
            console.log("Title added to arr:", array[i].Title);
        });

    }
}

function fetchMovies(movieName) {
    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=12e7b5bd`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let array = response.Search;
            displayPoster(array);
        })
        .catch(function(error) {
            console.log("Error fetching movies:", error);
        });
}

fetchMovies("batman");



const input = document.querySelector(".searchInput");

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchMovies(input.value);
    }
});






// Event listener for clicking on the favorite icon
let favoriteIcon = document.querySelector(".favourite");

favoriteIcon.addEventListener('click', function() {
    displayFavoriteMovies();
});

// Function to display favorite movies
function displayFavoriteMovies() {
    const backgroundMoviesCard = document.querySelector(".backgroundMoviesCard");
    if (!backgroundMoviesCard) {
        console.error(".backgroundMoviesCard not found.");
        return;
    }
    
    backgroundMoviesCard.innerHTML = ""; // Clear the container
    
    for (let i = 0; i < arr.length; i++) {
        const movieId = arr[i];
        fetchMovieById(movieId)
            .then(function(movie) {
                const card = createMovieCard(movie);
                backgroundMoviesCard.appendChild(card);
            })
            .catch(function(error) {
                console.error("Error fetching movie:", error);
            });
    }
}

// Function to fetch movie by ID
function fetchMovieById(movieId) {
    return fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=12e7b5bd`)
        .then(function(response) {
            return response.json();
        });
}

// Function to create a movie card
function createMovieCard(movie) {
    const outerCard = document.createElement('div');
    outerCard.classList.add('outer-card');

    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url(${movie.Poster})`;

    outerCard.appendChild(card);

    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = arr.includes(movie.imdbID) ? 'Remove from Favorite' : 'Add to Favorite';

     card.addEventListener('click',function(){
        displayMovieDetails(movie.imdbID);
    });

    outerCard.appendChild(button);

    button.addEventListener('click', function() {
        toggleFavorite(movie.imdbID);
    });

    return outerCard;
}

// Function to toggle favorite status
function toggleFavorite(movieId) {
    const index = arr.indexOf(movieId);
    if (index !== -1) {
        arr.splice(index, 1);
    } else {
        arr.push(movieId);
    }
    localStorage.setItem('arr', JSON.stringify(arr));
    displayFavoriteMovies();
}





