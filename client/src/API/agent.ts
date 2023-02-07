import axios, { AxiosError, AxiosResponse } from "axios";
// const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
// import { toast } from "react-toastify";
// import { history } from "..";


// const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:7226/api/';
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

// axios.interceptors.response.use(async response => {
//     await sleep();
//     return response;
// }, (error: AxiosError) => {
//     const { data , status } = error.response!;
//     switch (status) {
//         case 400:
//             if (data.errors) {
//                 const modelStateErrors: string[] = [];
//                 for (const key in data.errors) {
//                     if (data.errors[key]) {
//                         modelStateErrors.push(data.errors[key])
//                     }
//                 }
//                 throw modelStateErrors.flat();
//             }
//             toast.error(data.title);
//             break;
//         case 401:
//             toast.error(data.title);
//             break;
//         case 500:
//             history.push({
//                 pathname: '/server-error',
//                 state: {error: data}
//             });
//             break;
//         default:
//             break;
//     }
//     return Promise.reject(error.response);
// })


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('/Products'),
    details: (id: number) => requests.get(`Products/getbyid?id=2`)
}
const Basket = {
    get: () => requests.get('https://localhost:7226/api/Basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('Account/login', values),
    register: (values: any) => requests.post('Account/register', values),
    currentUser: () => requests.get('Account/getUser'),
    getAll: () => requests.get('Account/getAllUsers'),
}


const agent = {
    Catalog,
    Account,
    Basket


}

export default agent
