const express = require("express");
const app = express();
const port = 2000;
const axios = require("axios").default;

// API KEY:
// c0af7194607876d6036970e4504abc6d

// https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// TODO: DA FIXARE, NON VA
//! LINK: https://developers.themoviedb.org/3/trending/get-trending
// trends movie per stato
// trends per giorno TODO: DA METTERE IN UNA RIGA
// TODO: day, week, month, year
// per giorno:
// https://api.themoviedb.org/3/trending/movie/day?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// per settimana:
// https://api.themoviedb.org/3/trending/movie/week?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// per mese:
// https://api.themoviedb.org/3/trending/movie/month?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// per anno:
// https://api.themoviedb.org/3/trending/movie/year?api_key=c0af7194607876d6036970e4504abc6d&language=en-US

// test:
// https://api.themoviedb.org/3/trending/movie/${time}?api_key=c0af7194607876d6036970e4504abc6d&language=en-US
// https://localhost:2000/trends/
app.get(`/api/movie/trends`, (req, resp) => {
  console.log("CALLING MOVIE ");
  //const country = req.query.country;
  const time = req.query.time; // day, week, month, year
  const type = req.query.type; // all, movie, tv, person
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get(`https://api.themoviedb.org/3/trending/${type}/${time}`, {
      params: {
        api_key: "c0af7194607876d6036970e4504abc6d",
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
/* GIUSTA
app.get('/api/movie/trends' ,  (req , resp) =>{


    console.log("CALLING MOVIE ")
    const country = req.query.country
    const axios = require('axios').default;
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/trending/movie/week%22,%7B
        params:{
            api_key: 'c0af7194607876d6036970e4504abc6d',
            language: 'it-IT'
        }
    }
    )
    .then(function (response) {
        // handle success
        console.log(response);

        resp.send(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
})
*/

// movies id
// https://api.themoviedb.org/3/movie/ID?api_key=c0af7194607876d6036970e4504abc6d&language=it-IT
// https://localhost:2000/movie/:id?id=${id}
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
// http://localhost:2000/api/movie/search/genere?ID_GENERE=
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

app.listen(port, () => {
  console.log(`Sto ascoltando sulla porta ${port}...`);
});
