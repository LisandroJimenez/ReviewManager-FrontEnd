import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://reviewmanager-production.up.railway.app/reviewManager/v1',
    timeout: 5000
})

export const getPost = async (categoryId = null, title = "") => {
    try {
        const params = {};
        if (categoryId) params.categoryId = categoryId;
        if (title) params.title = title;

        const response = await apiClient.get('/publications', { params });
        return response.data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error getting posts';
        return {
            error: true,
            msg,
            e
        };
    }
};

export const addComments = async (id, data) => {
    try {
        const response = await apiClient.post(`/comments/${id}`, data)
        return { data: response.data }
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error adding comments'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const editComments = async (id, data) => {
    try {
        const response = await apiClient.put(`/comments/${id}`, data)
        return { data: response.data }
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error updating comment'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const deleteComments = async (id) => {
    try {
        return await apiClient.delete(`/comments/${id}`)
    } catch (e) {
        const msg = error.response?.data?.msg || "Error deleting comment"
        return {
            error: true,
            msg,
            e
        }
    }
}

// services.js
export const getCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        return response.data;
    } catch (e) {
        return {
            error: true,
            msg: 'Error getting categories',
            e
        }
    }
};
