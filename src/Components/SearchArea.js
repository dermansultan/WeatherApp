import React from "react";
import WeatherCard from "./WeatherCard";
import UnitToggleSwitch from "./UnitToggleSwitch";
import CountrySelect from "./countrySelect";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchArea extends React.Component {
  constructor() {
    super();
    this.state = {
      userLon: "",
      userLat: "",
      searchedCountry: "",
      searchedCity: "",
      fetchedObj: "",
      isCelcius: true,
      searched: false,
      fetching: false,
      notFound: false,
    };
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  handleSubmit(e) {
    this.getLocation();
    e.preventDefault();
  }

  handleChange = (e) => {
    if (e.target.type === "checkbox") {
      this.setState((prevState) => {
        return {
          isCelcius: !prevState.isCelcius,
        };
      });
    }

    if (e.target) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ searchedCountry: e.target.value });
    }
  };
  // Methods
  getUserLocation = function () {
    const apiKey = "d8f412d679e95b8c39a4474133f90d70";
    this.setState({
      fetching: true,
    });

    const success = async (pos) => {
      let crd = pos.coords;
      this.setState({
        userLon: crd.longitude,
        userLat: crd.latitude,
      });
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${apiKey}`,
          {
            mode: "cors",
          }
        );
        const searchData = await response.json();
        let weatherDataObj = {
          name: JSON.stringify(searchData["name"]),
          weatherParam: JSON.stringify(searchData["weather"][0]["main"]),
          weatherDesc: JSON.stringify(searchData["weather"][0]["description"]),
          country: JSON.stringify(searchData["sys"]["country"]),
          sunRise: new Date(
            searchData["sys"]["sunrise"] * 1000
          ).toLocaleTimeString("en-US"),
          cloudPercent: JSON.stringify(searchData["clouds"]["all"]),
          sunSet: new Date(
            searchData["sys"]["sunset"] * 1000
          ).toLocaleTimeString("en-US"),
          main: searchData["main"],
          visibility: searchData["visibility"] / 1000,
          wind:
            Math.round(
              (searchData["wind"].speed * 3.6 + Number.EPSILON) * 100
            ) / 100,
          img: searchData["weather"][0]["icon"],
        };
        this.setState({
          searched: true,
          fetchedObj: weatherDataObj,
          fetching: false,
          notFound: false,
        });
      } catch (error) {
        console.error("Poop, we dont get no weather", error);
        this.setState({
          notFound: true,
          fetching: false,
        });
      }
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      this.setState({
        fetching: false,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });
  };

  getLocation = async function () {
    const apiKey = "d8f412d679e95b8c39a4474133f90d70";
    const searchFor =
      this.state.searchedCity + "," + this.state.searchedCountry;
    this.setState({
      fetching: true,
    });
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchFor}&appid=${apiKey}`,
        {
          mode: "cors",
        }
      );
      const searchData = await response.json();
      let weatherDataObj = {
        name: JSON.stringify(searchData["name"]),
        weatherParam: JSON.stringify(searchData["weather"][0]["main"]),
        weatherDesc: JSON.stringify(searchData["weather"][0]["description"]),
        country: JSON.stringify(searchData["sys"]["country"]),
        sunRise: new Date(
          searchData["sys"]["sunrise"] * 1000
        ).toLocaleTimeString("en-US"),
        cloudPercent: JSON.stringify(searchData["clouds"]["all"]),
        sunSet: new Date(searchData["sys"]["sunset"] * 1000).toLocaleTimeString(
          "en-US"
        ),
        main: searchData["main"],
        visibility: searchData["visibility"] / 1000,
        wind:
          Math.round((searchData["wind"].speed * 3.6 + Number.EPSILON) * 100) /
          100,
        img: searchData["weather"][0]["icon"],
      };
      this.setState({
        searched: true,
        fetchedObj: weatherDataObj,
        fetching: false,
        notFound: false,
      });
    } catch (error) {
      console.error("Poop, we dont get no weather", error);
      this.setState({
        notFound: true,
        fetching: false,
      });
    }
  };

  render() {
    return (
      <div>
        <h1 className="FindWeather">
          {this.state.notFound
            ? "Oops! We can't find that location try again."
            : "Find Weather"}
        </h1>
        <form className="weatherForm" onSubmit={this.handleSubmit}>
          <div className="searchWrapper">
            <CountrySelect
              value={this.state.searchedCountry}
              onChange={this.handleChange}
            ></CountrySelect>
            <input
              className="searchedCity"
              name="searchedCity"
              placeholder="City"
              value={this.state.searchedCity}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="btnWrapper">
            <button
              className="locationBtn"
              type="button"
              onClick={() => this.getUserLocation()}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </button>
            <button
              className="searchBtn"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
        {this.state.fetching ? (
          <div className="loadingDiv">Loading...</div>
        ) : (
          <div>
            <WeatherCard
              userSearched={this.state.searched}
              fetchedObj={this.state.fetchedObj}
              weatherUnit={this.state.isCelcius}
            ></WeatherCard>
          </div>
        )}
        <UnitToggleSwitch
          checked={this.state.isCelcius}
          onChange={this.handleChange}
          userSearched={this.state.searched}
        ></UnitToggleSwitch>
      </div>
    );
  }
}

export default SearchArea;
