import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { AuthService } from 'src/apis/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {
    return this.authService.signIn(signInRequestBodyDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpRequestBodyDto: SignUpRequestBodyDto) {
    return this.authService.signUp(signUpRequestBodyDto);
  }
}
