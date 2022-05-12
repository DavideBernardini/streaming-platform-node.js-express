const express = require("express");
const app = express();
const port = 2000;
//https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
//c0af7194607876d6036970e4504abc6d
//https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
const axios = require("axios").default;
//trends movie
app.get("/api/movie/trends", (req, resp) => {
  console.log("CALLING MOVIE ");
  const country = req.query.country;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/trending/movie/week", {
      params: {
        api_key: "c0af7194607876d6036970e4504abc6d",
        language: "it-IT",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);

      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Sto ascoltando sulla porta ${port}...`);
});

//movies id
// https://api.themoviedb.org/3/movie/ID?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT
app.get("/api/movie/:id", (req, resp) => {
  const id = req.params.id;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/movie/" + id, {
      params: {
        api_key: "c0af7194607876d6036970e4504abc6d",
        language: "it-IT",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);
      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// search movies
// https://api.themoviedb.org/3/search/movie?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT&query=NOME_MOVIE
app.get("/api/movie/search/movie", (req, resp) => {
  const query = req.query.query;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "c0af7194607876d6036970e4504abc6d",
        language: "it-IT",
        query: query,
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);
      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
