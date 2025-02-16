import {Controller, Get, Post, Body, Query, ValidationPipe } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentRequestDto } from '../dto/payment-request.dto';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async processPayment(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        paymentRequest: PaymentRequestDto,
    ): Promise<any> {
        return await this.paymentService.processPayment(paymentRequest);
    }

    @Post('/spawn')
    async spawnPayments(): Promise<string> {
        await this.paymentService.spawnPayments();
        return 'Payments successfully generated';
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
