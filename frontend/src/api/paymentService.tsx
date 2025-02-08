import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export async function getPayments(queryParams: { page?: number, perPage?: number; sort?: 'asc' | 'desc' } = {}) {
    const { page, perPage, sort } = queryParams;
    const response = await axios.get(`${API_BASE_URL}/payments`, {
        params: { page, perPage, sort },
    });
    return response.data;
}

export async function submitPayment(paymentDetails: object) {
    try {
        const response = await axios.post(`${API_BASE_URL}/payments`, paymentDetails);
        if (response.status !== 201 && response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error during payment submission:', error);
        throw error;
    }
}

export async function spawnPayments() {
    try {
        const response = await axios.post(`${API_BASE_URL}/payments/spawn`);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error spawning payments:', error);
        throw error;
    }
}
