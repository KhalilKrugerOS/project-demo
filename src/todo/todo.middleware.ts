import { Injectable, NestMiddleware } from "@nestjs/common";


@Injectable()
export class TodoMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        console.log("the method is " + req.method, "the body is ", req.body, "the URL is " + req.url);
        next();
    }
}