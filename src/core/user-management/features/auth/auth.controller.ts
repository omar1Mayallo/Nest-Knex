import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18nService: I18nCustomService,
  ) {}

  // @desc: User Register
  // @url: POST => "auth/register"
  @Post('register')
  async register(@Body() body: CreateUserDTO) {
    return await this.authService.register(body);
  }

  // @desc: User Login
  // @url: POST => "auth/login"
  @Get('login')
  @HttpCode(200)
  async login(@Body() body: any) {
    if (true) {
      throw new NotFoundException(this.i18nService.t('validation.NOT_EMPTY'));
    }
  }

  // @desc: User Forget Password
  // @url: POST => "auth/forget-password"
  @Post('forget-password')
  async forgetPassword(body: any) {
    console.log('forgetPassword');
  }

  // @desc: User Login With OTP
  // @url: POST => "auth/login-otp"
  @Post('login-otp')
  async loginWithOtp(body: any) {
    console.log('loginWithOtp');
  }
}
