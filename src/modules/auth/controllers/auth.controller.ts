import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { SerializeUserResponse } from 'src/common/interceptors';
import { SignupUserDto } from '../dto';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { LoginResponse, RequestWithUser } from '../interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SerializeUserResponse()
  async signup(@Body() signupUserDto: SignupUserDto) {
    return await this.authService.signup(signupUserDto);
  }

  // 🐻‍❄️ JWT transporting directly in the response
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: RequestWithUser): Promise<LoginResponse> {
    const { user } = request;

    // Returning the jwt inside the response
    return await this.authService.login(user);
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  async authenticateCurrentUser(
    @Req() request: RequestWithUser,
  ): Promise<User> {
    const { user } = request;
    return user;
  }
}
