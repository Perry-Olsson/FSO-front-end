import React from "react";

const Search = ({ search, setSearch }) => (
  <div>
    <b>Search Countries: </b>
    <input value={search} onChange={(event) => setSearch(event.target.value)} />
  </div>
);

export default Search;
