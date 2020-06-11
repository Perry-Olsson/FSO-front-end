import React from "react";

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name}
    <span>
      {person.number} <button onClick={deletePerson}>delete</button>
    </span>
  </div>
);

export default Person;
