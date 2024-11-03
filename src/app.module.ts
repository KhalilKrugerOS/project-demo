import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [BookingModule, PaymentModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
