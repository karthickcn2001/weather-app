const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

// instance of express app
const app = express();

//middleware to parse request body as url encoded or JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors middleware to allow cross-origin resource sharing
app.use(cors());


const apiKey = "d372ec6f5307a7eb30b629d227f0bc84";

// Handle's GET request to '/weather' endpoint
app.get("/weather", async (req, res) => {
  // Get's the location from the query parameter
  const location = req.query.location;
  try {
    // Send's GET request to openweathermap API to get weather data for the location
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    // Extract's required data from the response
    const data = response.data;
    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
    };
    // Send weather data in JSON format
    res.json(weatherData);
  } catch (error) {
    // Handle errors
    if (error.response.status === 404) {
      // If location not found, send 404 status code and error message
      res.status(404).send("Weather data not found");
    } else {
      // Otherwise, send 500 status code and error message
      res.status(500).send("Internal server error");
    }
  }
});

// Start's the server on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

