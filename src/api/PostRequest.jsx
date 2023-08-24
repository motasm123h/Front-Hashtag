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
//this is for upload image
export const uploadImage = (data) => API.post('/post/imageUpload', data, headers)
//this is for upload the post
export const uploadPost = (data) => API.post('/post/create', data, headers)

export const getTimeLinePosts = () => API.get('/post/index', headers);

export const DeletePost = (id) => API.delete(`post/delete/${id}`, headers);

export const EditePost = (formData, id) => API.post(`post/update/${id}`, formData, headers);

export const profileInfo = (id) => API.get(`post/profail/${id}`, headers);

// const { data } = await axios.get(`api/post/type/${post_type}`)

export const getPostByType = (post_type) => API.get(`post/type/${post_type}`, headers); 