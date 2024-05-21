import axios from 'axios';

const api = axios.create({
    baseURL: 'https://freelanceapp-back.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (formData) => api.post('/auth/register', formData);
export const login = (formData) => api.post('/auth/login', formData);
export const getUserProfile = () => api.get('/auth');
export const createProject = (formData) => api.post('/projects', formData);
export const getProjectsByClient = (clientId) => api.get(`/projects/client/${clientId}`);
export const getProjectsByFreelancer = (freelancerId) => api.get(`/projects/freelancer/${freelancerId}`);
export const addProjectToFreelancer = (projectId) => api.put(`/projects/add/${projectId}`);
export const acceptOrder = (orderId, freelancerId) => api.put(`/projects/${orderId}`, { freelancerId });
export const getOrders = () => api.get('/orders');
export const addReview = (formData) => api.post('/reviews', formData);
export const getReviews = (projectId) => api.get(`/reviews/${projectId}`);
export const updateProfile = (formData) => api.put('/profile', formData);
export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);
