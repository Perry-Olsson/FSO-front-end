const filterPeople = (search, persons) => {
  const regex = new RegExp(search.trim(), "i");
  return persons.filter((person) => person.name.match(regex) !== null);
};

export default filterPeople;
