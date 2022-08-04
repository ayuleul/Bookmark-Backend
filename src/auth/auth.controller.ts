import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    this.authService.signup('username', 'password');
  }

  @Post('login')
  login() {
    this.authService.login('username', 'password');
  }
}
