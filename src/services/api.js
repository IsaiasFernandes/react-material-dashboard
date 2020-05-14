import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com'
});

export default api;
