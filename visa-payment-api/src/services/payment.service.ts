import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpClient } from '../utils/http-client';
import { PaymentGateway} from '../controllers/payment.gateway';

@Injectable()
export class PaymentService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly paymentGateway: PaymentGateway,
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

            const savedPayment = await new this.paymentModel(completedPayment).save();

            this.paymentGateway.sendPaymentUpdate(savedPayment);

            return savedPayment;
        } catch (err) {
            console.error('Error making payment request:', err.message);
            throw new Error('Payment processing failed.');
        }
    }

    async getPayments(page: number = 1, perPage: number = 10, sort: 'asc' | 'desc' = 'desc'): Promise<any> {
        const skip = (page - 1) * perPage;
        return await this.paymentModel
            .find()
            .sort({ createdAt: sort === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(perPage)
            .exec();
    }
}
