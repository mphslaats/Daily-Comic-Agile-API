const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const nunjucks = require('nunjucks');

const url = `https://www.comicagile.net/`


nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// app.get('/', (req, res) => {
//   axios.get(url).then(response => {
//     const $ = cheerio.load(response.data);
//     console.log('ola');
//     const comicTitle = $('#spliced-comic').find('h2').text();
//     console.log(comicTitle);
//     const comicUrl = $('#spliced-comic').find('img').attr('src');
//     console.log(comicUrl);
//     res.render('index.html', {
//       "title": comicTitle,
//       "image": `${comicUrl}.png`
//     });
//   }).catch(error => res.json(error));
// });


app.get('/json', (req, res) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    console.log('ola');
    const comicTitle = $('#spliced-comic').find('h2').text();
    console.log(comicTitle);
    const comicUrl = $('#spliced-comic').find('img').attr('src');
    const jsonResponse = {
      "title": comicTitle,
      "image": `${comicUrl}.png`,
    };
    res.json(jsonResponse);
  }).catch(error => res.json(error));
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
