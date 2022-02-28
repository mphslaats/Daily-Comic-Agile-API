const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const nunjucks = require("nunjucks");

const url = `https://www.comicagile.net/`;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const comic = $("#spliced-comic")
      
      const comicTitle = comic.find("h2").text();
      const comicUrl = comic.find("img").attr("src");
      const comicText = comic.find("p").text();
    
      res.render("index.html", {
        title: comicTitle,
        image: comicUrl,
        text: comicText,
      });
    })
    .catch((error) => res.json(error));
});

app.get("/json", (req, res) => {
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const comic = $("#spliced-comic")
      
      const comicTitle = $("#spliced-comic").find("h2").text();
      const comicUrl = $("#spliced-comic").find("img").attr("src");
      const comicText = $("#spliced-comic").find("p").text();
    
      const jsonResponse = {
        title: comicTitle,
        image: comicUrl,
        text: comicText,
      };
      res.json(jsonResponse);
    })
    .catch((error) => res.json(error));
});

app.get("/search", (req, res) => {
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const comic = $("#spliced-comic")
      
      const comicTitle = $("#spliced-comic").find("h2").text();
      const comicUrl = $("#spliced-comic").find("img").attr("src");
      const comicText = $("#spliced-comic").find("p").text();
    
      const jsonResponse = {
        title: comicTitle,
        image: comicUrl,
        text: comicText,
      };
      res.json(jsonResponse);
    })
    .catch((error) => res.json(error));
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
