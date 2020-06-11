import React from "react";

const Weather = ({ country }) => {
  if (country.weatherError === true) return <p>could not retrieve weather</p>;
  else
    return (
      <>
        <p>
          <b>temperature:</b> {country.weather.current.temperature} Celcius
        </p>
        <img
          alt="weather"
          src={country.weather.current.weather_icons[0]}
          height="50px"
          width="50px"
        />
        <p>
          <b>wind:</b> {country.weather.current.wind_speed} mph
        </p>
      </>
    );
};

export default Weather;
