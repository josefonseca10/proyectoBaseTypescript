import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envConfig } from '../../config';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envConfig.apiConfig.secret, // Cambia esto por tu clave secreta
      signOptions: { expiresIn: envConfig.apiConfig.expireTimeToken }, // Cambia esto según tus necesidades
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
