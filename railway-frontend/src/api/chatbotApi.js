import axios from 'axios';

const chatbotApi = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default chatbotApi;
