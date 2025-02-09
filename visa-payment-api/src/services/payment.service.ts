import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpClient } from '../utils/http-client';
import { PaymentGateway } from '../controllers/payment.gateway';
import { paymentFactory } from '../utils/payment-factory';

@Injectable()
export class PaymentService {
    constructor(
        readonly httpClient: HttpClient,
        private readonly paymentGateway: PaymentGateway,
        @InjectModel('Payment') private readonly paymentModel: Model<any>,
    ) {}

    async processPayment(paymentData: any): Promise<any> {
        try {
            // Step 1: Perform anti-fraud check
            const isFraudulent = await this.isFraudulentPayment(paymentData.cardNumber);

            if (isFraudulent) {
                return await this.savePayment(paymentData, 'fraud');
            }

            // Step 2: Process payment through the mock Visa API
            const paymentStatus = await this.processVisaPayment(paymentData);

            return await this.savePayment(paymentData, paymentStatus);
        } catch (error) {
            console.error('Error processing payment:', error.message);
            throw new Error('Payment processing failed.');
        }
    }

    private async isFraudulentPayment(cardNumber: string): Promise<boolean> {
        try {
            const antiFraudResponse = await this.httpClient.post('/anti-fraud', { cardNumber });
            return !antiFraudResponse.pass;
        } catch (error) {
            if (error.response?.status === 400) {
                console.warn('Fraudulent card detected:', cardNumber);
                return true;
            }
            console.error('Unexpected error during anti-fraud check:', error.message);
            throw new Error('Anti-fraud check failed.');
        }
    }

    private async processVisaPayment(paymentData: any): Promise<'success' | 'declined' | 'fraud'> {
        try {
            const paymentResponse = await this.httpClient.post('/payments', {
                cardNumber: paymentData.cardNumber,
                cardHolder: paymentData.cardHolder,
                expiry: paymentData.expiry,
                cvv: paymentData.cvv,
                amount: paymentData.amount,
            });

            if (paymentResponse.status === 'failed') {
                return 'fraud';
            }

            return paymentResponse.status === 'approved' ? 'success' : 'declined';
        } catch (error) {
            console.error('Error making payment request:', error.message);
            throw new Error('Visa payment processing failed.');
        }
    }

    private async savePayment(paymentData: any, status: 'success' | 'declined' | 'fraud'): Promise<any> {
        const paymentToSave = {
            ...paymentData,
            status,
            createdAt: new Date(),
        };
        const savedPayment = await new this.paymentModel(paymentToSave).save();

        this.paymentGateway.sendPaymentUpdate(savedPayment);

        return savedPayment;
    }


    async spawnPayments(quantity: number = 1000): Promise<void> {
        for (let i = 0; i < quantity; i++) {
            await paymentFactory(this);
            console.log(`Spawned payment #${i + 1} of ${quantity}`);
        }
    }

    async getPayments(page: number = 1, perPage: number = 10, sort: 'asc' | 'desc' = 'desc'): Promise<any> {
        const skip = (page - 1) * perPage;
        return await this.paymentModel
            .find()
            .sort({
                createdAt: sort === 'desc' ? -1 : 1,
                _id: sort === 'desc' ? -1 : 1,
            })
            .skip(skip)
            .limit(perPage)
            .exec();
    }
}
