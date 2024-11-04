import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): string {
    return 'hello';
  }
  @Get('/user')

  getHelloFromUser(): string {
    return this.appService.getHelloFromUser();
  }

  @Post('/user')
  sayHelloToUser(@Query('name') query: string): string {
    return this.appService.sayHelloToUser(query);
  }

  @Post('/hello/:name/:id/:natio')
  sayHello(@Param() params): string {
    return this.appService.getHello(params);
  }

  @Get('/hello')
  getHelloBody(@Body('id') body) {
    return this.appService.getHelloBody(body);
  }

  @Get('/checkout')
  getCheckout(@Req() req: any, @Res() res: any) {
    return this.appService.getCheckout(req, res);
  }
}
