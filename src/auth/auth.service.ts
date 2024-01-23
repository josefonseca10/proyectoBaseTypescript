import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserLogin } from './models/userLogin';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from '../../config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: UserLogin): Promise<{ access_token: string }> {
    try {
      const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
      const token = await this.jwtService.signAsync(
        { payload: base64 },
        {
          expiresIn: envConfig.apiConfig.expireTimeToken,
          secret: envConfig.apiConfig.secret,
        },
      );
      return {
        access_token: token,
      };
    } catch (reason) {
      throw new HttpException(
        `Ocurrió un error en el servidor. ${reason}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
