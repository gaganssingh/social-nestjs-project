import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExcludePasswordInterceptor } from 'src/common/interceptors';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  // Passport will run the validate() function automatically
  // This will internally call the passport verify method
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.getAuthenticatedUser({
      email,
      password,
    });
    delete user.password;
    return user;
  }
}
