import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  // @desc: User Register
  // @url: POST => "auth/register"
  @Post('register')
  async register(body: any) {
    console.log('register');
  }

  // @desc: User Login
  // @url: POST => "auth/login"
  @Post('login')
  async login(body: any) {
    console.log('login');
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
