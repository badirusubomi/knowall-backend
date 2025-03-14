import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: any, _res: any, next: (error?: Error | any) => void) {
    const time = new Date();
    console.log('LOG:', time, req.rawHeaders);
    next();
  }
}
