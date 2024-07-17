import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/apis/auth/constants/auth.constant';
import { SignInDto } from 'src/apis/auth/dto/sign-in.dto';
import { SignUpDto } from 'src/apis/auth/dto/sign-up.dto';
import { Payload } from 'src/apis/auth/types/auth.type';
import { UsersService } from 'src/apis/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const newUser = await this.usersService.create(signUpDto);

    return this.generateToken({ id: newUser.id });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

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
