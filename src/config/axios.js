import axios from "axios";

const axiosClient = axios.create(
  {
    baseURL: 'http://localhost:8000',
    headers:
    {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
  }
);

export default axiosClient;