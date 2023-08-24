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

export const getRandomFriend = () => API.get('getRandomfriend', headers);
export const sendFriendRequest = (id) => API.post(`sendfreind/${id}`, headers);
export const acceptFrienReuest = (id) => API.post(`accepptfreind/${id}`, headers);
export const rejectFrienReuest = (id) => API.post(`rejectedfreind/${id}`, headers);
export const getFriend = () => API.get('getfreind', headers);
export const getSendRequest = () => API.get('getSendRequest', headers);
export const getRecievedRequest = () => API.get('getRecievedRequest', headers);
export const getOnlineFriends = () => API.get('getOnlineFriends', headers);