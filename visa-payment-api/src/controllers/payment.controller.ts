import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async processPayment(@Body() paymentData: any): Promise<any> {
        return await this.paymentService.processPayment(paymentData);
    }

    @Get()
    async getPayments(): Promise<any> {
        return await this.paymentService.getAllPayments();
    }
}
