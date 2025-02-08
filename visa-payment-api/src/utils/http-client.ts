import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.MOCK_VISA_API_URL || 'http://localhost:3001',
        });
    }

    async post(path: string, data: any): Promise<any> {
        try {
            const response = await this.client.post(path, data);
            return response.data;
        } catch (err) {
            console.error(`Failed POST to ${path} with data:`, data, 'Error:', err.message);
            console.error('Axios config:', err.config);
            console.error('Response data:', err.response?.data);
            throw err;
        }
    }

    async get(path: string, params: any = {}): Promise<any> {
        try {
            const response = await this.client.get(path, { params });
            return response.data;
        } catch (err) {
            console.error(`Failed GET from ${path} with params:`, params, 'Error:', err.message);
            console.error('Axios config:', err.config);
            console.error('Response data:', err.response?.data);
            throw err;
        }
    }
}
