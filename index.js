const express = require("express");
const app = express();
const axios = require("axios").default;

const port = 2000;
const APY_KEY = "c0af7194607876d6036970e4504abc6d";

//DOC AXIOS: https://axios-http.com/docs/example
// API KEY:
// c0af7194607876d6036970e4504abc6d

// per giorno:
// https://api.themoviedb.org/3/trending/movie/day?api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// scomposto:
// https://api.themoviedb.org/3/trending/ + all + / + day + ? + api_key + &language=en-US

// localhost:2000/api/movie/trends?type=all&time=day

//TODO: TREND FILMS DEL GIORNO, SETTIMANA, MESE, ANNO + TUTTI I TIPI , FILM, TV
// test:
// localhost:2000/api/movie/trends/movie/day
app.get(`/api/movie/trends/:type/:time`, (req, resp) => {
  //const country = req.query.country;
  const type = req.params.type; // all, movie, tv
  const time = req.params.time; // day, week, month, year
  const language = "it-IT"; // en-US, it-IT, es-ES, ...

  resp.setHeader("Access-Control-Allow-Origin", "*");
  // Make a request for a user with type (all, movie, tv) and time (day, week, month, year)
  axios
    .get("https://api.themoviedb.org/3/trending/" + type + "/" + time, {
      params: {
        api_key: APY_KEY,
        language: language,
      },
    })
    .then(function (response) {
      // handle success
      if (type === "movie") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              original_title: item.original_title,
              overview: item.overview,
              release_date: item.release_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              adult: item.adult,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      } else if (type === "tv") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              original_name: item.original_name,
              overview: item.overview,
              first_air_date: item.first_air_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// TODO: RiCERCA FILM PER ID
// https://api.themoviedb.org/3/movie/ID?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT
// localhost:2000/movie/3
app.get("/api/movie/:id", (req, resp) => {
  const id = req.params.id;
  const language = "it-IT"; // en-US, it-IT, es-ES, ...

  resp.setHeader("Access-Control-Allow-Origin", "*");
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
      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

//TODO: RICERCA TRAILER PER ID

// https://api.themoviedb.org/3/ movie / 3 /videos? api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// https://api.themoviedb.org/3/movie/671/videos?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// localhost:2000/api/video/movie/671
app.get("/api/video/:type/:id", (req, resp) => {
  const type = req.params.type; // all, movie, tv
  const id = req.params.id;
  const language = "en-US"; // en-US, it-IT, es-ES, ...
  resp.setHeader("Access-Control-Allow-Origin", "*");
  axios
    .get("https://api.themoviedb.org/3/" + type + "/" + id + "/videos", {
      params: {
        api_key: APY_KEY,
        language: language,
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);
      //resp.send(response.data); //escono tutte le info
      // TEST
      if (type === "movie") {
        resp.json(
          "https://www.youtube.com/embed/" + response.data.results[0].key
        );
      } if (type === "tv") {
        resp.json("https://www.youtube.com/watch?v=" + response.data.results[0].key);
      }
      //TEST
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// TODO: RICERCA FILM PER TITOLO E TIPO

// https://api.themoviedb.org/3/search/movie?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT&query=NOME_MOVIE
// localhost:2000/api/title/search/movie/spiderman
app.get("/api/title/search/:type/:query", (req, resp) => {
  const type = req.params.type; //movie, tv
  const query = req.params.query; // spiderman, titanic, ...
  const language = "it-IT";
  const adult = false;

  resp.setHeader("Access-Control-Allow-Origin", "*");
  // Make a request for a user with type and query
  axios
    .get("https://api.themoviedb.org/3/search/" + type, {
      params: {
        api_key: APY_KEY,
        language: language,
        query: query,
        include_adult: adult,
      },
    })
    .then(function (response) {
      // handle success
      if (type === "movie") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              original_title: item.original_title,
              overview: item.overview,
              release_date: item.release_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              adult: item.adult,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      } else if (type === "tv") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              original_name: item.original_name,
              overview: item.overview,
              first_air_date: item.first_air_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// TODO: RICERCA PER GENERE
// lista di tutti i generi:
// https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT

// ricerca per genere
// https://api.themoviedb.org/3/discover/movie?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT&with_genres=ID_GENERE
// localhost:2000/api/movie/search/ID
app.get("/api/:type/search/:id_genere", (req, resp) => {
  const id_genere = req.params.id_genere;
  const type = req.params.type;
  const language = "it-IT";
  resp.setHeader("Access-Control-Allow-Origin", "*");
  // Make a request for a user with id_genere
  axios
    .get("https://api.themoviedb.org/3/discover/" + type, {
      params: {
        api_key: APY_KEY,
        language: language,
        with_genres: id_genere,
        include_video: true,
      },
    })

    .then(function (response) {
      // handle success
      if (type === "movie") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              original_title: item.original_title,
              overview: item.overview,
              release_date: item.release_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              adult: item.adult,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      } else if (type === "tv") {
        resp.json(
          response.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              original_name: item.original_name,
              overview: item.overview,
              first_air_date: item.first_air_date,
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              vote_average: item.vote_average,
              popularity: item.popularity,
              original_language: item.original_language,
              genre_ids: item.genre_ids,
              video: item.video,
            };
          })
        );
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Sto ascoltando sulla porta ${port}...`);
});
