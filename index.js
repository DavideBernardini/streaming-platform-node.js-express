const express = require('express')
const app = express()
const port = 2000

const axios = require('axios').default;

app.get('/api/movie/trends' ,  (req , resp) =>{

    
    console.log("CALLING MOVIE ")
    const country = req.query.country
    const axios = require('axios').default;
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/trending/movie/week",{
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

app.listen(port, () => {
    console.log(`Sto ascoltando sulla porta ${port}...`)
});