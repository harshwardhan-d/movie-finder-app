# 🎬 Movie Finder App

A dynamic web application to search and explore movie details using the OMDB API. Built with HTML, CSS, JavaScript, Express.js, and Node.js.

## 🚀 Features

- 🔍 Search for movies by name
- 🎞️ View detailed movie information including:
  - 🎬 Title
  - 📅 Year
  - 🖼️ Poster
  - 🎭 Genre
  - 🎤 Actors
  - 🎬 Director
  - 📝 Plot Summary
  - ⭐ IMDb Rating
- 🧠 Uses `async/await` and `fetch()` for smooth asynchronous operations
- 🌐 OMDB API integration
- 💾 Static frontend served with Express.js backend

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: OMDB API

## 📦 Installation

1. Clone the repository:  
    ```
    git clone https://github.com/harshwardhan-d/movie-finder-app.git
    cd movie-finder-app
    ```

2. Install backend dependencies:  
    ```
    npm install
    ```

3. Create a `.env` file in the root directory and add your API keys:  
    ```
    OMDB_API_KEY_SEARCH=your_api_key
    OMDB_API_KEY_DETAIL=your_api_key
    ```

4. Start the server:  
    ```
    node index.js
    ```

5. Open your browser and visit:  
    ```
    http://localhost:3000
    ```