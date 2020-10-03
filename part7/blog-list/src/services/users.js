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

const getLikes = async user => {
  const response = await axios.get(`${baseUrl}/likes/${user.id}`);
  user.likes = response.data.likes;
  return user;
};

export default { getAll, like, getLikes };
