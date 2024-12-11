import { Injectable } from '@nestjs/common';
import { LoggerInterface } from './interfaces/LoggerInterface.js';

@Injectable()
export class ConsoleLoggerService implements LoggerInterface {
  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`
    console.log(logMessage);
  }
}
