const formParser = (newNumber, newName, persons) => {
  const formInfo = {
    formatOk: true,
    error: "",
    alert: "",
    name: "",
    number: "",
  };
  if (newNumber.match(/[^\d-()]/gm) !== null) {
    formInfo.formatOk = false;
    formInfo.alert = "Number must contain only characters 0-9()-";
    formInfo.error = "number";
    return formInfo;
  }
  persons.forEach((person) => {
    if (person.name.toLowerCase() === newName.toLowerCase()) {
      formInfo.formatOk = false;
      formInfo.alert = `${newName} is already in the phonebook`;
      formInfo.error = "name";
      return formInfo;
    }
    if (
      person.number.replace(/[()-]/gm, "") === newNumber.replace(/[()-]/gm, "")
    ) {
      formInfo.formatOk = false;
      formInfo.alert = `${newNumber} is already in the phonebook`;
      formInfo.error = "number";
      return formInfo;
    }
  });
  formInfo.name = newName.trim();
  formInfo.number = newNumber.replace(/\s/gm, "");
  return formInfo;
};

export default formParser;
