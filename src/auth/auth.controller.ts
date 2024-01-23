import {
  BadRequestException,
  Controller,
  Get,
  Session,
  Query,
  Res,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { UserLogin } from './models/userLogin';
import { AuthService } from './auth.service';
import { envConfig } from '../../config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Res() res: any, @Query('to') to: any, @Session() session: any) {
    const data = session.cas;
    const { access_token } = await this.authService.generateToken(data);
    return res.send({ token: access_token });
  }
  @Get('signingDev')
  async authDev(): Promise<{ access_token: string }> {
    try {
      const data: UserLogin = {
        user: '57470',
        attributes: {
          aplicacionWeb: [
            '0030|Factura Elec MEM Hidrovictoria',
            '0027|Anticipo de Proveedores',
            '0022|Gitorious versionamiento',
            '0000|Administracion de aplicaciones',
          ],
          uid: ['57470'],
          mail: ['jffonseca@eeq.com.ec'],
          sn: ['Fonseca Paz'],
          authenticationDate: ['Sat Sep 18 16:25:24 ECT 2021'],
          isFromNewLogin: ['true'],
          givenName: ['Jose Emilio'],
          longTermAuthenticationRequestTokenUsed: ['false'],
          displayName: ['DTIC. Fonseca Paz Jose Emilio'],
        },
      };
      const result = await this.authService.generateToken(data);
      return result;
    } catch (reason) {
      if (reason instanceof BadRequestException) {
        console.error('Error de validación:', reason.getResponse());
        throw reason;
      }
      console.error('Error inesperado:', reason);
      throw new InternalServerErrorException(
        'Ocurrió un error en el servidor.',
      );
    }
  }

  @Get('logout')
  async logout(@Req() req: any, @Res() res: any) {
    // Clean cookies for cas
    res.clearCookie(envConfig.apiConfig.nameCookies);
    res.clearCookie(envConfig.apiConfig.nameCookiesCas);
    const casLogoutUrl = 'http://cas.eeq.com.ec/cas/logout';
    res.redirect(casLogoutUrl);
  }
}
