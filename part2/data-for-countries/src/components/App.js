import React, { useState, useEffect } from "react";
import Search from "./Search";
import Countries from "./Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [displayCountry, setDisplayCountry] = useState("");
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setWeather(false);
    setDisplayCountry("");
    setSearch(event);
  };

  const filterCountries = () => {
    const regex = new RegExp(
      displayCountry !== "" ? displayCountry : search,
      "gim"
    );
    return countries.filter((country) => country.name.match(regex) !== null);
  };
  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries
        weather={weather}
        setWeather={setWeather}
        setDisplayCountry={setDisplayCountry}
        countries={filterCountries()}
        search={search}
      />
    </div>
  );
};

export default App;
