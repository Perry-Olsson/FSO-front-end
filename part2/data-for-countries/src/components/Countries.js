import React from "react";
import Country from "./Country";

const Countries = ({
  countries,
  search,
  weather,
  setWeather,
  setDisplayCountry,
}) => (
  <>
    {countries.length === 1 && <h1>{countries[0].name}</h1>}
    {countries.length < 11 ? (
      countries.map((country) => (
        <Country
          key={country.name}
          country={country}
          weather={weather}
          setWeather={setWeather}
          display={countries.length === 1 ? true : false}
          setDisplayCountry={setDisplayCountry}
        />
      ))
    ) : search !== "" ? (
      <p>Too many Matches</p>
    ) : (
      <></>
    )}
  </>
);

export default Countries;
