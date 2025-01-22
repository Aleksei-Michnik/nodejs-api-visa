import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './controllers/payment.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/visa-payment'),
      PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
