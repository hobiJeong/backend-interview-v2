import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/apis/auth/constants/auth.constant';
import { Payload } from 'src/apis/auth/types/auth.type';
import { UsersService } from 'src/apis/users/services/users.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: Payload): Promise<UserEntity> {
    const existUser = await this.usersService.findOneById(payload.id);

    if (!existUser) {
      throw new UnauthorizedException('This token is invalid.');
    }

    return existUser;
  }
}
