async function moviesData(movieName) {
    try {
      let jsonData = await fetch(`/movies?q=${movieName}`);
      let res = await jsonData.json();

      console.log("Movie Data from Backend:", res);
  
      if (!res.omdb || !res.omdb.Search) {
        console.log("No movies found");
        return {
          response: [],
          Length: 0
        };
      }
  
      return {
        response: res.omdb.Search,
        Length: res.omdb.Search.length,
        fullInfo: res.moreInfo
      };
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }
  
  let resultsContainer = document.getElementById("resultsContainer");
  
  async function searchMovie() {
    console.log("Search triggered"); 
    let inputBox = document.getElementById("movieInput");
    let movieName = inputBox.value;
    let loader = document.getElementById("loader");
    loader.style.display = "block";
  
    let data = await moviesData(movieName);
    loader.style.display = "none";
    resultsContainer.innerHTML = "";

    if (!data || data.Length === 0) {
        resultsContainer.innerHTML = "<p style='color:white;text-align:center'>No movies found.</p>";
        console.log("No valid data returned from backend.");
        return;
      }
      
  
    for (let i = 0; i < data.Length; i++) {
      let movieCards = document.createElement("div");
      movieCards.classList.add("movie-card");
      resultsContainer.appendChild(movieCards);
  
      let poster = data.response[i].Poster;
      let image = document.createElement("img");
     
image.src = poster !== "N/A" ? poster : "images/noposter.webp";
image.onerror = () => {
    image.src = "images/noposter.webp";
  };


      movieCards.appendChild(image);
  
      let fullMovie = data.fullInfo[i];
      let movieInfo = document.createElement("div");
      movieInfo.classList.add("movie-info");
      movieInfo.innerHTML = `
        <h2>${data.response[i].Title} ${data.response[i].Year}</h2>
        <p><strong>IMDb:</strong> ⭐ ${fullMovie.imdbRating}</p>
        <p><strong>Genre:</strong> ${fullMovie.Genre}</p>
        <p><strong>Director:</strong> ${fullMovie.Director}</p>
        <p><strong>Actors:</strong> ${fullMovie.Actors}</p>
        <p><strong>Plot:</strong> ${fullMovie.Plot}</p>
        <div style="margin-top: auto;">
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(fullMovie.Title + " trailer")}" target="_blank" style="display: inline-block; margin-top: 12px; padding: 8px 12px; background-color: #ff4e00; color: #fff; border-radius: 6px; text-decoration: none;">
            🎬 Watch Trailer
          </a>
        </div>
      `;
      movieCards.appendChild(movieInfo);
    }
  }
  
  let inputBox = document.getElementById("movieInput");
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  });
  
  function changeBackdrop() {
    const backdrops = [
      "images/dune.webp",
      "images/batman.webp",
      "images/interstellar.webp",
      "images/something.webp",
      "images/harrypotter.webp",
      "images/avengers.webp",
      "images/rings.webp"
    ];
    let currentIndex = 0;
  
    function updateBackground() {
      document.body.style.backgroundImage = `url('${backdrops[currentIndex]}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
      currentIndex = (currentIndex + 1) % backdrops.length;
    }
  
    updateBackground();
    setInterval(updateBackground, 5000);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    changeBackdrop();
  });
  