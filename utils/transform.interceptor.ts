import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK, // Código de respuesta predeterminado
        data,
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          // Si ya es una excepción HTTP, reenvía tal cual
          throw error;
        } else {
          // Si no es una excepción HTTP, crea una nueva excepción HTTP
          throw new HttpException(
            'Ocurrió un error en el servidor.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }),
    );
  }
}
