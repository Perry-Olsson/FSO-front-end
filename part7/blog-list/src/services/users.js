import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const like = async (userId, blogId) => {
  const response = await axios.post(`${baseUrl}/like/${userId}/${blogId}`);
  return response.data;
};

export default { getAll, like };
