import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.dto';
import { IUserTokenResponse } from './types/user-token-response.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18nService: I18nCustomService,
  ) {}

  // @desc: User Register
  // @url: POST => "auth/register"
  @Post('register')
  async register(@Body() body: CreateUserDTO): Promise<IUserTokenResponse> {
    return await this.authService.register(body);
  }

  // @desc: User Login
  // @url: POST => "auth/login"
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDTO): Promise<IUserTokenResponse> {
    return await this.authService.login(body);
  }

  // @desc: User Forget Password
  // @url: POST => "auth/forget-password"
  @Post('forget-password')
  async forgetPassword(_: any) {
    console.log('forgetPassword');
  }

  // @desc: User Login With OTP
  // @url: POST => "auth/login-otp"
  @Post('login-otp')
  async loginWithOtp(_: any) {
    console.log('loginWithOtp');
  }
}
