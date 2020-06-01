import React, { useState } from "react";
import People from "./People";
import NewPerson from "./NewPerson";
import Search from "./Search";
import formParser from "../modules/formParser";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas", number: "040-123456" },
    { id: 1, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 2, name: "Dan Abramov", number: "12-43-234345" },
    { id: 3, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const formInfo = formParser(newNumber, newName, persons);
    if (formInfo.formatOk) {
      const newPerson = {
        name: formInfo.name,
        number: formInfo.number,
        id: persons.length,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      formInfo.error === "number" ? setNewNumber("") : setNewName("");
      alert(formInfo.alert);
    }
  };

  const regex = new RegExp(search.trim(), "i");
  const personsFiltered = persons.filter(
    (person) => person.name.match(regex) !== null
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <NewPerson
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <People persons={personsFiltered} />
    </div>
  );
};

export default App;
