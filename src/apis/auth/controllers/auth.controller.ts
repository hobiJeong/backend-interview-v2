import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/apis/auth/dto/sign-in.dto';
import { SignUpDto } from 'src/apis/auth/dto/sign-up.dto';
import { AuthService } from 'src/apis/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
