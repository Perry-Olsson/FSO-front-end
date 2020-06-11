import React from "react";
import Person from "./Person";

const People = ({ persons, deletePerson }) => (
  <>
    {persons.map((person) => (
      <Person
        deletePerson={() => deletePerson(person.id, person.name)}
        key={person.id}
        person={person}
      />
    ))}
  </>
);
export default People;
