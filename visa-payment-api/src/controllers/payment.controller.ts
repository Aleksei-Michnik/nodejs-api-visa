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
        @Query('page') page: string,
        @Query('perPage') perPage: string,
        @Query('sort') sort: 'asc' | 'desc',
    ): Promise<any> {
        const pageNumber = parseInt(page, 10) || 1;
        const perPageNumber = parseInt(perPage, 10) || 10;
        return await this.paymentService.getPayments(pageNumber, perPageNumber, sort || 'desc');
    }
}
