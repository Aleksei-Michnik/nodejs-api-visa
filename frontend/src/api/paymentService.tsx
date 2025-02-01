import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export async function getPayments() {
    const response = await axios.get(`${API_BASE_URL}/payments`);
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
