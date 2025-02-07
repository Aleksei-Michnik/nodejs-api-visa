import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async processPayment(@Body() paymentData: any): Promise<any> {
        return await this.paymentService.processPayment(paymentData);
    }

    @Get()
    async getPayments(
        @Query('limit') limit: string,
        @Query('sort') sort: 'asc' | 'desc',
    ): Promise<any> {
        const limitNumber = parseInt(limit, 10) || 20;
        return await this.paymentService.getPayments(limitNumber, sort || 'desc');
    }
}
