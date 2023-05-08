import { faTemperatureHigh, faTint, faCloud, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react"; // Importing the useState hook from the react library
import axios from "axios"; // Importing axios library to make API requests
import "./client.css";

function WeatherApp() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { // Tries to make the API request to fetch the weather data for the user-entered location
      const response = await axios.get(`http://localhost:5000/weather`, { // Making a GET request to the weather API endpoint
        params: { // Passing the user-entered location as a query parameter to the API endpoint
          location: searchValue,
        },
      });
      const data = response.data; // Storing the weather data returned from the API response in the data variable

      const formattedValue = searchValue
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setLocation(formattedValue); // Setting the location state variable to the formatted location value

      setWeatherData({ // Setting the weatherData state variable to an object containing the temperature, humidity and weather condition data returned from the API
        temperature: data.temperature,
        humidity: data.humidity,
        weather: data.weather,
      });
      setErrorMessage(""); // Clearing any previous error messages from the errorMessage state variable
    } catch (error) { // If there is an error while making the API request, set the error message in the errorMessage state variable
      setWeatherData(null);
      setErrorMessage("Invalid location! Please try again!");
    }
  };

  const handleSearchChange = (event) => { // This function is called whenever the user types in the search input field
    setSearchValue(event.target.value); // Updates the searchValue state variable with the current value of the search input field
  };

  return (
    <div className="weather-app">
      <h1 className="weather-app__title">Find the weather condition for your location</h1>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>   {/* // Binding the handleSubmit function to the form's onSubmit event */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Eg: delhi, bangalore"
                  aria-label="Enter the Location"
                  aria-describedby="button-addon2"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" type="submit" id="button-addon2">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {errorMessage && <p className="error"><FontAwesomeIcon icon={faExclamationCircle} /> Invalid location </p>}
      {weatherData && (
        <div className="weather-data">
          <h2 className="location">Current Weather Conditions for <span>{location}</span></h2><br />
          <p className="temperature"><FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: <span>{weatherData.temperature}°C</span></p><br />
          <p className="humidity"><FontAwesomeIcon icon={faTint} /> Humidity: <span>{weatherData.humidity}%</span></p><br />
          <p className="weather"><FontAwesomeIcon icon={faCloud} /> Weather: <span>{weatherData.weather}</span></p>
        </div>
      )}
    </div>

  );
}
export default WeatherApp;