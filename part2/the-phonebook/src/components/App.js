import React, { useState, useEffect } from "react";
import People from "./People";
import NewPerson from "./NewPerson";
import Search from "./Search";
import Notification from "./notification/Notification";
import formParser from "../services/formParser";
import phonebookService from "../services/phonebookService";
import filterPeople from "../services/filtration";
import notify from "../services/notify"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    phonebookService.getAll().then(res => setPersons(res))
  }, []);

  const updatePerson = (id, newPerson) => {
    phonebookService
      .updatePerson(id, newPerson)
      .then((res) => {
        setPersons(persons.map((person) => (person.id !== id ? person : res)));
        setNewNumber("");
        notify(setNotification, {type: 'success', message: `Updated ${res.name}`})
      })
      .catch((error) => {
        if (error.response.data.type=== 'notFound')
          setPersons(persons.filter(person => person.id !== id))
        setNewNumber("");
        notify(setNotification, {
          message: error.response.data.error,
          type: "error",})
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const formInfo = formParser(newNumber, newName, persons, updatePerson);
    if (formInfo.formatOk) {
      const newPerson = {
        name: formInfo.name,
        number: formInfo.number,
      };

      phonebookService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        notify(setNotification, {type: 'success', message: `Added ${returnedPerson.name}`})
      })
      .catch(err => {
        notify(setNotification, {message: err.response.data.error, type: 'error'})
      });
    } else {
      formInfo.error === "number" ? setNewNumber("") : setNewName("");
      formInfo.handleError(setNotification);
    }
  };

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`delete ${name}?`);
    if (confirmed) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          notify(setNotification, {type: 'success', message: `Deleted ${name}`})
        })
        .catch((err) => {
          notify(setNotification, {message: err.message, type: 'error'})
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
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
