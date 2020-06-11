const formParser = (newNumber, newName, persons, updatePerson) => {
  const formInfo = {
    formatOk: true,
    error: "",
    handleError: "",
    name: "",
    number: "",
  };
  if (newNumber.match(/[^\d-()]/gm) !== null) {
    formInfo.formatOk = false;
    formInfo.handleError = (setNotification) => {
      setNotification({
        message: "Number must only contain characters 0-9()-",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: null, type: "success" });
      }, 10000);
    };
    formInfo.error = "number";
    return formInfo;
  }
  persons.forEach((person) => {
    if (person.name.toLowerCase() === newName.toLowerCase()) {
      formInfo.formatOk = false;
      formInfo.handleError = () => {
        const confirmation = window.confirm(
          `${newName} is already in the phonebook, would you like to replace the old number?`
        );
        if (confirmation) {
          const newPerson = { ...person, number: newNumber };
          updatePerson(person.id, newPerson);
        }
      };
      formInfo.error = "name";
      return formInfo;
    }
    if (
      person.number.replace(/[()-]/gm, "") === newNumber.replace(/[()-]/gm, "")
    ) {
      formInfo.formatOk = false;
      formInfo.handleError = (setNotification) => {
        setNotification({
          messgae: `${newNumber} is already in the phonebook`,
          type: "error",
        });
        setTimeout(
          () => setNotification({ message: null, type: "success" }),
          5000
        );
      };
      formInfo.error = "number";
      return formInfo;
    }
  });
  formInfo.name = newName.trim();
  formInfo.number = newNumber.replace(/\s/gm, "");
  return formInfo;
};

export default formParser;
