import React from "react";

const Country = ({ country, matches }) => {
  return (
    <>
      <p>{country.name}</p>
      {matches === 1 && (
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
    </>
  );
};

export default Country;
