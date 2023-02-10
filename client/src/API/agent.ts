import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:7226/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {

    let userData = localStorage.getItem("user");
    if (userData) {
     
        let data = JSON.parse(userData);
        let token = data.token;
        if (config && config.headers) {
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config;
        }
    }
    return config;
});

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
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('Account/login', values),
    register: (values: any) => requests.post('Account/register', values),
    currentUser: () => requests.get('Account/getUser'),
    getAll: () => requests.get('Account/getAllUsers'),
    fetchAddress: () => requests.get('account/savedAddress')
}
const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const agent = {
    Catalog,
    Account,
    Basket,
    Orders,
    Payments,
}

export default agent
