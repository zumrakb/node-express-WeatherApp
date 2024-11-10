const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();

const weatherData = require("../utils/weatherData.js");
const { title } = require("process");

/* this is where my oublic folders exist: */
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/* telling express which ui library will be used: */
app.set("view engine", "hbs");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

/* every serrves has different port. so this is opening port in every different server. */
const port = process.env.PORT || 3000;

/* in / home route, i wanna see index.hbs. */
app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
});

/* 3rd party api fetch. /weather route oluşturuldu */

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Address is required.");
  }
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }
    res.send(result); /* result should be printed on the browser */
  });
});

/* olmayan bir route girildiğinde bu çalışacak + burada 404.hbs render edeceğiz error için */
app.get("*", (req, res) => {
  res.render("404", { title: "Page Not Found" });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
