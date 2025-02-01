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
        const antiFraudResponse = await this.httpClient.post('/anti-fraud', {
            cardNumber: paymentData.cardNumber,
        });

        if (!antiFraudResponse.pass) {
            const failedPayment = {
                ...paymentData,
                status: 'fraud',
                createdAt: new Date(),
            };

            await new this.paymentModel(failedPayment).save();

            return failedPayment;
        }

        try {
            const paymentResponse = await this.httpClient.post('/payments', {
                cardNumber: paymentData.cardNumber,
                cardHolder: paymentData.cardHolder,
                expiry: paymentData.expiry,
                cvv: paymentData.cvv,
                amount: paymentData.amount,
            });

            const paymentStatus =
                paymentResponse.status === 'approved' ? 'success' : 'declined';

            const completedPayment = {
                ...paymentData,
                status: paymentStatus,
                createdAt: new Date(),
            };

            await new this.paymentModel(completedPayment).save();

            return completedPayment;
        } catch (err) {
            console.error('Error making payment request:', err.message);
            throw new Error('Payment processing failed.');
        }
    }

    async getAllPayments(): Promise<any> {
        return await this.paymentModel.find().exec();
    }
}
