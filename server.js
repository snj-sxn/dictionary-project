const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log(path.join(__dirname, 'public'));
  return res.sendFile('public/index.html', { root: __dirname });
});

app.get('/searchword', (req, res) => {
  const userSearchWord = req.query.word; // Get the word from the query parameter
  
  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
    params: { entry: userSearchWord }, // Use the user-provided word
    headers: {
      'X-RapidAPI-Key': '5f8a5a5006msh50c23749c4ef065p1f3052jsn8387dae81adc',
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} - http://localhost:${port}`);
});
