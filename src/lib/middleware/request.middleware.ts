import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interface';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: IRequest<any>, _res: Response, next: NextFunction) {
    req.reqIp = req.ip;
    req.userAgent = req.headers['user-agent'];

    // const deviceDetails = new UAParser(req.headers['user-agent']).getResult();

    // req.device = deviceDetails;
    next();
  }
}
