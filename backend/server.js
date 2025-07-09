require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY_SEARCH = process.env.OMDB_API_KEY_SEARCH;
const API_KEY_DETAIL = process.env.OMDB_API_KEY_DETAIL;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/movies", async (req, res) => {
  try {
    const movieName = req.query.q;
    const searchRes = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY_SEARCH}`);
    const search = await searchRes.json();

    if (!search.Search) {
      return res.status(404).json({ error: "No movies found" });
    }

    const imdbData = [];
    for (const movie of search.Search) {
      const info = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY_DETAIL}`);
      const fullMovie = await info.json();
      imdbData.push(fullMovie);
    }

    res.json({ omdb: search, moreInfo: imdbData });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
