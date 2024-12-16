import { Injectable } from '@nestjs/common';
import { LoggerInterface } from './interfaces/LoggerInterface.js';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileLoggerService implements LoggerInterface {
  private readonly logFilePath = path.join(__dirname, '../../logs/app.log');

  constructor() {
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '', { flag: 'a' });
    }
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(this.logFilePath, logMessage, { encoding: 'utf8' });
  }
}
