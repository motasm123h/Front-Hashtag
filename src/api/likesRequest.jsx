import axios from 'axios'
const total_user_info = localStorage.getItem('token');
const user = JSON.parse(total_user_info)
const token = user ? user : ''
// console.log(token)

const API = axios.create({
    baseURL: "http://localhost:8000/api",
})

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
const headers = {
    headers:
    {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
    }
};

export const likeOrUnLike = (id) => API.post(`/post/like/create/${id}`, headers);
