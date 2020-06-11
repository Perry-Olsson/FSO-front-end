import React from "react";

const Search = ({ search, handleSearchChange }) => (
  <div>
    <b>Search Countries: </b>
    <input
      value={search}
      onChange={(event) => handleSearchChange(event.target.value)}
    />
  </div>
);

export default Search;
