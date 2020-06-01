import React from "react";

const Person = ({ person }) => (
  <div>
    {person.name}
    <span>{person.number}</span>
  </div>
);

export default Person;
