import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export async function getPayments() {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
}

export async function submitPayment(paymentDetails: object) {
    const response = await axios.post(`${API_BASE_URL}/payments`, paymentDetails);
    return response.data;
}
