import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from '../config';
import { ApaEmployeeModule } from './apa-employee/apa-employee.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../utils/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cas = require('connect-cas');

@Module({
  imports: [
    TypeOrmModule.forRoot(envConfig.db.mainOracle),
    ApaEmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Utiliza el filtro de excepciones que has creado
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.ALL });
    cas.configure(envConfig.casConfig.configure);
    consumer
      .apply(
        cas.ssout(envConfig.casConfig.outCas),
        cas.serviceValidate(),
        cas.authenticate(),
      )
      .forRoutes({ path: 'auth/login', method: RequestMethod.ALL });
  }
}

export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    session({
      name: envConfig.apiConfig.nameCookies,
      secret: envConfig.apiConfig.passwordCookies,
      resave: false,
      saveUninitialized: true,
    })(req, res, next);
  }
}
