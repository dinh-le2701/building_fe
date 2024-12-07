import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8181',
});

const fetchURL = 'http://localhost:8181'

export default AxiosInstance;