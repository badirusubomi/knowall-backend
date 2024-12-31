import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log(req);
    next();
  }
}
