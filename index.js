const express = require("express");
const app = express();
const port = 2000;
const axios = require("axios").default;

// API KEY:
// c0af7194607876d6036970e4504abc6d

// https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
//
// trends movie per stato+
// trends per giorno TODO: DA METTERE IN UNA RIGA
// https://api.themoviedb.org/3/trending/movie/day?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// https://api.themoviedb.org/3/trending/movie/week?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
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
        country: "IT",
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

// movies id
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

//search for genre
// lista di tutti i generi:
// https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT
// ricerca per genere
// https://api.themoviedb.org/3/discover/movie?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT&with_genres=ID_GENERE
// ricerva un max di 20 film per genere (possono avere più generi)
// TODO: da vedere se la ricerca è random, o se aggiorni cambiano i film (SEMBRA DI NO)

app.get("/api/movie/search/genere", (req, resp) => {
  const ID_GENERE = req.query.ID_GENERE;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: "c0af7194607876d6036970e4504abc6d",
        language: "it-IT",
        with_genres: ID_GENERE,
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
