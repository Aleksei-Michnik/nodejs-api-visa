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
        const response = await this.client.post(path, data);
        return response.data;
    }
}
