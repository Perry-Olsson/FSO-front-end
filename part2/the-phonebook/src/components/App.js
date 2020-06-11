import React, { useState, useEffect } from "react";
import People from "./People";
import NewPerson from "./NewPerson";
import Search from "./Search";
import Notification from "./notification/Notification";
import formParser from "../services/formParser";
import phonebookService from "../services/phonebookService";
import filterPeople from "../services/filtration";
import axios from "axios";

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
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const updatePerson = (id, newPerson) => {
    phonebookService
      .updatePerson(id, newPerson)
      .then((res) => {
        setPersons(persons.map((person) => (person.id !== id ? person : res)));
        setNewNumber("");
        setNotification({
          ...notification,
          message: `Updated ${newPerson.name}`,
        });
        setTimeout(
          () => setNotification({ ...notification, message: null }),
          5000
        );
      })
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNewNumber("");
        setNotification({
          message: `${newPerson.name}'s information was not found on the server`,
          type: "error",
        });
        setTimeout(
          () => setNotification({ type: "success", message: null }),
          5000
        );
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
        setNotification({
          ...notification,
          message: `Added ${returnedPerson.name}`,
        });
        setTimeout(
          () => setNotification({ ...notification, message: null }),
          5000
        );
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
          setNotification({ ...notification, message: `Deleted ${name}` });
          setTimeout(() => {
            setNotification({ ...notification, message: null });
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `${name} has already been deleted`,
            type: "error",
          });
          setTimeout(
            () => setNotification({ type: "success", message: null }),
            5000
          );
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
