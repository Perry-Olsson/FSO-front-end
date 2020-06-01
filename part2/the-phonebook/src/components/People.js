import React from "react";
import Person from "./Person";

const People = ({ persons }) => (
  <>
    {persons.map((person) => (
      <Person key={person.id} person={person} />
    ))}
  </>
);
export default People;
