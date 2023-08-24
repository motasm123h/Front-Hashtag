import axios from 'axios'
import { uploadIma } from './../actions/uploadAction';
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

const headersImage = {
    headers:
    {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
        'Content-type': 'multipart/form-data',
    }
};



export const fetchstory = () => API.get('profile/story/index', headers);
export const getViews = (id) => API.get(`profile/story/watch/${id}/views`, headers)
export const getMyStory = () => API.get(`profile/Mystory`, headers)
export const viewStory = (id) => API.post(`profile/story/watch/${id}`, {}, headers)
export const createStory = (formData) => API.post('profile/story', formData, headers);
export const uploadStoryIma = (formData) => API.post('profile/story/upload_image', formData, headersImage);
export const deleteStory = (id) => API.post(`profile/story/${id}`, {}, headers)
