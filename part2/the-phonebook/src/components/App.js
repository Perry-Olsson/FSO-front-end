import React, { useState, useEffect } from "react";
import People from "./People";
import NewPerson from "./NewPerson";
import Search from "./Search";
import formParser from "../modules/formParser";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

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
