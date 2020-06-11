import React, { useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({
  country,
  display,
  weather,
  setWeather,
  setDisplayCountry,
}) => {
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  useEffect(() => {
    if (display) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        )
        .then((res) => {
          if (res.data.success === false) {
            country.weatherError = true;
            setWeather(true);
          } else {
            country.weatherError = false;
            country.weather = res.data;
            setWeather(true);
          }
        })
        .catch((err) => console.log(err));
    }
  });
  return (
    <>
      <p>
        {country.name}{" "}
        {!display && (
          <button onClick={() => setDisplayCountry(country.name)}>show</button>
        )}
      </p>
      {display && (
        <div>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language, i) => (
              <li key={i}>{language.name}</li>
            ))}
          </ul>
          <img
            alt="national flag"
            src={country.flag}
            width="50px"
            height="50px"
          />
        </div>
      )}
      {weather && (
        <>
          <h2>Weather in {country.capital}</h2>
          <Weather country={country} />
        </>
      )}
    </>
  );
};

export default Country;
