import React, { useState, useEffect } from "react";
import Search from "./Search";
import Countries from "./Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const filterCountries = () => {
    const regex = new RegExp(search, "gim");
    return countries.filter((country) => country.name.match(regex) !== null);
  };
  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={filterCountries()} search={search} />
    </div>
  );
};

export default App;
