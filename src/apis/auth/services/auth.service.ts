import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/apis/auth/constants/auth.constant';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { Payload } from 'src/apis/auth/types/auth.type';
import { UsersService } from 'src/apis/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpRequestBodyDto: SignUpRequestBodyDto) {
    const newUser = await this.usersService.create(signUpRequestBodyDto);

    return this.generateToken(newUser);
  }

  async signIn(signInRequestBodyDto: SignInRequestBodyDto) {
    const { email, password } = signInRequestBodyDto;

    const existUser = await this.usersService.findOneByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException('The account does not exist');
    }

    const isEqual = await existUser.comparePassword(password);

    if (!isEqual) {
      throw new UnauthorizedException('Invalid password.');
    }

    return this.generateToken({ id: existUser.id });
  }

  generateToken(payload: Payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: '1 day',
    });
  }
}
