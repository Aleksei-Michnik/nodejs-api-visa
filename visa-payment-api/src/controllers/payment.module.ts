import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from '../services/payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../schemas/payment.schema';
import { HttpClient } from '../utils/http-client';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService, HttpClient],
})
export class PaymentModule {}
