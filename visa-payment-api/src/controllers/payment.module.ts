import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpClient } from '../utils/http-client';
import { PaymentController } from './payment.controller';
import { PaymentGateway } from './payment.gateway';
import { PaymentService } from '../services/payment.service';
import { PaymentSchema } from '../schemas/payment.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    ],
    controllers: [PaymentController],
    providers: [HttpClient, PaymentService, PaymentGateway],
})
export class PaymentModule {}
