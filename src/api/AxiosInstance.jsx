import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8908',
});

// const fetchURL = 'http://localhost:8908'

export default AxiosInstance;