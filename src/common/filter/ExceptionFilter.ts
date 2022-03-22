import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      Logger.warn(exception);

      res.status(exception.getStatus()).json({
        status: exception.getStatus(),
        message: exception.message,
      });
    } else {
      Logger.error(exception);

      res.status(500).json({
        status: 500,
        message: '서버 오류',
      });
    }
  }
}
