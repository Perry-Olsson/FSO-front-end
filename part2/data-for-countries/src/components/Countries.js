import React from "react";
import Country from "./Country";

const Countries = ({ countries, search }) => (
  <>
    {countries.length === 1 && <h1>{countries[0].name}</h1>}
    {countries.length < 11 ? (
      countries.map((country) => (
        <Country
          key={country.name}
          country={country}
          matches={countries.length}
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
