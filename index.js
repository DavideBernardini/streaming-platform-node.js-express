const { query } = require("express");
const express = require("express");
const app = express();
const axios = require("axios").default;

const port = 2000;
const APY_KEY = "c0af7194607876d6036970e4504abc6d";
// API KEY:
// c0af7194607876d6036970e4504abc6d

// https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// per giorno:
// https://api.themoviedb.org/3/trending/movie/day?api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// scomposto:
// https://api.themoviedb.org/3/trending/ + all + / + day + ? + api_key + &language=en-US

// localhost:2000/api/movie/trends?type=all&time=day

// test:
// localhost:2000/api/movie/trends/movie/day

app.get(`/api/movie/trends/:type/:time`, (req, resp) => {
  //const country = req.query.country;
  const type = req.params.type; // all, movie, tv
  const time = req.params.time; // day, week, month, year
  //const language = req.query.language; // en-US, it-IT, es-ES, ...

  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/trending/" + type + "/" + time, {
      params: {
        api_key: APY_KEY,
        language: "en-US",
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

// movies id
// https://api.themoviedb.org/3/movie/ID?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT
// localhost:2000/movie/3
app.get("/api/movie/:id", (req, resp) => {
  const id = req.params.id;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/movie/" + id, {
      params: {
        api_key: APY_KEY,
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
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: APY_KEY,
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
// localhost:2000/api/movie/search/genere?ID_GENERE=${id}
app.get("/api/movie/search/genere", (req, resp) => {
  const ID_GENERE = req.query.ID_GENERE;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: APY_KEY,
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

app.listen(port, () => {
  console.log(`Sto ascoltando sulla porta ${port}...`);
});
