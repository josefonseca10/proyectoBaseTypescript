// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfig } from '../../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.apiConfig.secret, // Cambia esto por tu clave secreta
    });
  }

  async validate(payload: any) {
    // Aquí puedes implementar la lógica de validación del token
    // y retornar el usuario autenticado si es válido
    return { userId: payload.sub, username: payload.username };
  }
}
