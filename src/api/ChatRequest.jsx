import axios from 'axios'
const total_user_info = localStorage.getItem('token');
const user = JSON.parse(total_user_info)
const token = user ? user : ''
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

export const sendMessage = (id,msg) => API.post(`/snedMessage/${id}`, { message: msg }, headers);
export const FetchContacts = () => API.get(`/getUserWithMessages`, headers);
export const FetchMessage = (id) => API.get(`/getMessages/${id}`, headers);