import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ExcludePasswordInterceptor } from 'src/common/interceptors';

// 🐻‍❄️ Extracting JWT from Bearer request header
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Passport automatically passes in the token extracted from the Bearer Header
  // to the validate method as the payload
  async validate(payload: any) {
    return payload;
  }
}
