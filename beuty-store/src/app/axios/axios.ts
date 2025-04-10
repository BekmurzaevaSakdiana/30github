import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.response.use((config) => {
//     return config
// }, (err)=> {
//     if (err.response && err.response.status === 401) {
//         // localStorage.removeItem('userToken')
//         // localStorage.removeItem('userId')
//     }
//     return Promise.reject(err)
// })

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers["Authorization"] = "Token " + token;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('userToken')
//     if (token) {
//         config['headers']['Authorization']= 'Token ' + token
//     }
//     return config
// }, (err)=> {
//     if (err.response && err.response.status === 401) {
//         // localStorage.removeItem('userToken')
//         // localStorage.removeItem('userId')
//     }
//     return Promise.reject(err)

// })

export default axiosInstance;
