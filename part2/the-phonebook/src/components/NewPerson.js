import React from "react";

const NewPerson = ({
  addPerson,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => (
  <>
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </div>
      <br />
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default NewPerson;
