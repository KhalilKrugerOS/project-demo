import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params: any): string {
    console.table(params);
    return params;
  }
  getHelloFromUser(): string {
    return 'Hello User !';
  }
  sayHelloToUser(query: string): string {
    return 'Hello ' + query;
  }
  getHelloBody(body: any): string {
    return "id: " + body;
  }

  getCheckout(req: any, res: any) {
    res.send('checkout');
  }
}
