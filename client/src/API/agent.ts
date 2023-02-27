import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:7226/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {

    let userData = localStorage.getItem("user");
    console.log(localStorage.getItem("user"));
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

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
});

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('banoret', params),
    details: (id: number) => requests.get(`banoret/${id}`),
    fetchFilters: () => requests.get('banoret/filters')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (banoriId: number, quantity = 1) => requests.post(`basket?banoriId=${banoriId}&quantity=${quantity}`, {}),
    removeItem: (banoriId: number, quantity = 1) => requests.delete(`basket?banoriId=${banoriId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('Account/login', values),
    register: (values: any) => requests.post('Account/register', values),
    currentUser: () => requests.get('Account/getUser'),
    getAll: () => requests.get('Account/getAllUsers'),
    fetchAddress: () => requests.get('account/savedAddress'),
    getUserById: (id: number) => requests.get(`Account/getUserById/${id}`),

}
const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const Banoret = {
    update: (values: any,id: number) => requests.put(`Banoret/UpdateBanori/${id}`,values),
    delete: (id:number) => requests.delete(`Banoret/banori/${id}`),
    create: (values: any) => requests.post('Banoret/createBanor', values),
    get: () => requests.get('GetAll'),
    updateNom:(values: any,id: number) => requests.put(`Banoret/banori/nominated/${id}?nominated=${values}`,{})
}

const Comments= {
    getCommentsByPostId: (postId: number) =>
    requests.get(`Comments/GetCommentsByPostId/${postId}`),
    createComment: (comment: any) => requests.post('Comments', comment),
    getComment: (id: number) => requests.get(`Comments/${id}`),
    deleteComment: (id: number) => requests.delete(`Comments/${id}`),
}
//   const Likes = {
    //     likePost: (postId: number, userId: number) =>
    //       agent.post<LikeDTO>(`/Likes/Like/${postId}?userId=${userId}`),
    
    //     unlikePost: (postId: number, userId: number) =>
    //       agent.delete(`/Likes/Unlike/${postId}/${userId}`),
    
    //     getLikesByUserId: (params: PagingParams, userId: number) =>
    //       agent.get<GetLikesByUserIdResponse>(`/Likes/GetLikesByUserId/${userId}`, params),
    //   }
    const Posts= {
        
        getPosts: () => requests.get('Posts'),
        createPost: (post: any) => requests.post('Posts', post),
        getPost: (id: number) => requests.get(`Posts/${id}`),
        UpdatePost: (id: number,post:any) => requests.put(`Posts/${id}`,post),
        deletePost: (id: number) => requests.delete(`Posts/${id}`),
    }
    
    const Moments={
        get: () => requests.get('Moments'),
        create: (values: any) => requests.post('Moments/addMoment', values),
        delete: (id:number) => requests.delete(`Moments/delMoment/${id}`),
        update: (values: any,id: number) => requests.put(`Moments/updateMoment/${id}`,values),
        
    }

    const Primes={
        get: () => requests.get('Primes'),
        create: (values: any) => requests.post('Primes/addPrime', values),
        delete: (id:number) => requests.delete(`Primes/delPrime/${id}`),
        update: (values: any,id: number) => requests.put(`Primes/updatePrime/${id}`,values),
        
    }

    const Sponzors={
        get: () => requests.get('Sponzors'),
        create: (values: any) => requests.post('Sponzors/createSponzor', values),
        delete: (id:number) => requests.delete(`Sponzors/deleteSponzor/${id}`),
        update: (values: any,id: number) => requests.put(`Sponzors/updateSponzor/${id}`,values),
        
    }

const agent = {
    Catalog,
    Account,
    Basket,
    Orders,
    Payments,
    Banoret,
    Posts,
    // Likes,
    Comments,
    Moments,
    Primes,
    Sponzors
}

export default agent
