import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useAppSelector } from "../Store/hook";
import store from "../Store/Store";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:7226/api/';
const defaultOptions = {
    baseURL: 'https://localhost:7226/api/',
    headers: {
        'Content-Type': 'application/json',
    },
};
let instance = axios.create(defaultOptions);
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    console.log("albin");
    let userData = localStorage.getItem("user");
    if (userData) {
      console.log("hini");
      let data = JSON.parse(userData);
      let token = data.token;
      if (config && config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
      }
    }
    return config;
  });
  
// instance.interceptors.request.use((config: AxiosRequestConfig) => {
//     let userData = localStorage.getItem("user");
//     console.log("nuk hini ");
//     if (userData) {
//         console.log("hini");
//         let data = JSON.parse(userData);
//         let token = data.token;
//         if (config.headers) {
//             config.headers.Authorization = token ? `Bearer ${token}` : '';
//         }
//     } else {
//         console.error("No data found in local storage under key 'user'");
//     }
//     return config;
// })


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('Images'),
    details: (id: number) => requests.get(`products/${id}`)
}

const Account = {
    login: (values: any) => requests.post('Account/login', values),
    register: (values: any) => requests.post('Account/register', values),
    currentUser: () => requests.get('Account/getUser'),
}
const agent = {
    Catalog,
    Account
}

export default agent
