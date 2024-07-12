import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
     catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse<Response>();
          const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

          if (exception.code === 'P2002') { // Prisma unique constraint violation error code
               response.status(HttpStatus.CONFLICT).json({
                    statusCode: HttpStatus.CONFLICT,
                    message: 'Unique constraint violation',
                    detail: exception.meta,
               });
          } else {
               response.status(status).json({
                    statusCode: status,
                    message: exception.message,
               });
          }
     }
}