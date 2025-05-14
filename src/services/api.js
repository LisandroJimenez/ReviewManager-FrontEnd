import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/reviewManager/v1',
    timeout: 5000
})

export const getPost = async () => {
    try {
        return await apiClient.get('/publications')
    } catch (e) {
        const msg = error.response?.data?.msg || 'Error getting posts'
        return{
            error: true,
            msg, 
            e
        }
    }
}