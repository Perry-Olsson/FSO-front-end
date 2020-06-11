import React, { useState, useEffect } from "react";
import People from "./People";
import NewPerson from "./NewPerson";
import Search from "./Search";
import formParser from "../services/formParser";
import phonebookService from "../services/phonebookService";
import filterPeople from "../services/filtration";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const updatePerson = (id, newPerson) => {
    phonebookService.updatePerson(id, newPerson).then((res) => {
      setPersons(persons.map((person) => (person.id !== id ? person : res)));
      setNewNumber("");
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const formInfo = formParser(newNumber, newName, persons, updatePerson);
    if (formInfo.formatOk) {
      const newPerson = {
        id: persons[persons.length - 1].id + 1,
        name: formInfo.name,
        number: formInfo.number,
      };

      phonebookService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      formInfo.error === "number" ? setNewNumber("") : setNewName("");
      formInfo.handleError();
    }
  };

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`delete ${name}?`);
    if (confirmed) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => alert("unable to delete"));
    }
  };

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
      <People
        deletePerson={deletePerson}
        persons={filterPeople(search, persons)}
      />
    </div>
  );
};

export default App;
