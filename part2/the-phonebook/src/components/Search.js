import React from "react";

const Search = ({ search, setSearch }) => (
  <div>
    search:{" "}
    <input value={search} onChange={(event) => setSearch(event.target.value)} />
  </div>
);

export default Search;
