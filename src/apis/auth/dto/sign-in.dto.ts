import { IsEmail, Length } from 'class-validator';
import { USER_PASSWORD_LENGTH } from 'src/apis/users/constants/user.constant';
import type { UserModel } from 'src/entities/user.entity';

export class SignInDto implements Pick<UserModel, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  password: string;
}
