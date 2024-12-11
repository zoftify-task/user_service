import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerInterface } from './interfaces/LoggerInterface.js';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {

  constructor(
    @Inject('LoggerInterface') private readonly logger: LoggerInterface,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const finish = Date.now();
      const message: string = `[${req.method}] ${req.originalUrl} - ${res.statusCode} (${finish - start}ms)`;
      this.logger.log(message)
    })
    next();
  }
}
