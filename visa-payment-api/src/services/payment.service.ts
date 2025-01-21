import { Injectable } from '@nestjs/common';
import { HttpClient } from '../utils/http-client';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
    constructor(
        private readonly httpClient: HttpClient,
        @InjectModel('Payment') private readonly paymentModel: Model<any>,
    ) {}

    async processPayment(paymentData: any): Promise<any> {
        // Call Mock Visa API (example)
        const antiFraudResponse = await this.httpClient.post('/anti-fraud', {
            cardNumber: paymentData.cardNumber,
        });

        if (!antiFraudResponse.pass) {
            return { status: 'failed', message: 'Fraud detected!' };
        }

        const paymentResponse = await this.httpClient.post('/payments', {
            cardNumber: paymentData.cardNumber,
            amount: paymentData.amount,
        });

        if (paymentResponse.status === 'approved') {
            await new this.paymentModel(paymentData).save();
        }

        return paymentResponse;
    }

    async getAllPayments(): Promise<any> {
        return await this.paymentModel.find().exec();
    }
}
