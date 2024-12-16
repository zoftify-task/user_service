import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpExceptionResponse, HttpExceptionResponse } from './models/http-exception-response.interface.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();
    const errorMessage =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message;
        
    const exceptionResponse = this.getExceptionResponse(status, errorMessage, request);
    response.status(status).json(exceptionResponse);

  }
  private getExceptionResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date()
  })

}
