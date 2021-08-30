const path = require("path");
const hbs = require("hbs");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

//define paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Daniel Trebilcock",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Daniel Trebilcock",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Daniel Trebilcock",
    message: `Please go to the help tab and find the topic you're interested in`,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  geocode(req.query.address, (err, {location, longitude, latitude} = {}) => {
    if(err) {
      return res.send({
        error: err
      })
    }

    forecast(longitude, latitude, (err, forecastData) => {
      if(err) {
        return res.send({
          error: err
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })

    })
  })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Daniel Trebilcock",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404",
    name: "Daniel Trebilcock",
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
