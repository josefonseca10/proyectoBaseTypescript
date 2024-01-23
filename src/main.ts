import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from '../config';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  // Create and start the server
  let server;
  if (envConfig.apiConfig.runCertifications) {
    // Load certifications SSL
    const privateKey = fs.readFileSync(
      envConfig.apiConfig.privateKeyCertificateHttps,
      'utf8',
    );
    const certificate = fs.readFileSync(
      envConfig.apiConfig.certificateHttps,
      'utf8',
    );
    const ca = fs.readFileSync(envConfig.apiConfig.certificateHttps, 'utf8');
    const httpsOptions = {
      key: privateKey,
      cert: certificate,
      ca,
    };
    // enable HTTPS
    server = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    await server.listen(envConfig.apiConfig.port);
    logger.log(
      `Application is running with HTTPS on port ${envConfig.apiConfig.port}`,
    );
  } else {
    // enable HTTP
    server = await NestFactory.create(AppModule);
    await server.listen(envConfig.apiConfig.port);
    logger.log(`Application is running on port ${envConfig.apiConfig.port}`);
  }
  if (envConfig.apiConfig.enableCas) {
    server.use(cookieParser(envConfig.apiConfig.passwordCookies));
  }
  server.enableCors({
    origin: '*',
  });
}
bootstrap();
