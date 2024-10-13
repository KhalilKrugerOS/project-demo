import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/user")
  getHelloFromUser(): string {
    return this.appService.getHelloFromUser();
  }
  @Post("/user")
  sayHelloToUser(@Query() query): string {
    return query;
    return this.appService.sayHelloToUser();
  }
}
