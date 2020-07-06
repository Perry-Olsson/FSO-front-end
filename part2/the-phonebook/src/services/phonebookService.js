import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const res = await request;
  return res.data;
};

const createPerson = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  const res = await request;
  return res.data;
};

const updatePerson = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  const res = await request;
  return res.data;
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const res = await request;
  return res;
};

export default { getAll, createPerson, updatePerson, deletePerson };
