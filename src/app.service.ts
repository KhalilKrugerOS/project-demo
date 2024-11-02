import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHelloFromUser(): string {
    return 'Hello User !';
  }
  sayHelloToUser(query): string {
    return 'Hello User ' + query.name
  }
}
