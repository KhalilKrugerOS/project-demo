import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';

@Module({
  imports: [],
  controllers: [AppController, BookingController],
  providers: [AppService, BookingService],
})
export class AppModule { }
