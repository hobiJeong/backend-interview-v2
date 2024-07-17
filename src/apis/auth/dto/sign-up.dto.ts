import { IsEmail, Length, Matches } from 'class-validator';
import {
  phoneRegex,
  USER_NAME_LENGTH,
  USER_PASSWORD_LENGTH,
} from 'src/apis/users/constants/user.constant';
import type { UserModel } from 'src/entities/user.entity';

export class SignUpDto
  implements Pick<UserModel, 'name' | 'phoneNumber' | 'email' | 'password'>
{
  @Length(USER_NAME_LENGTH.MIN, USER_NAME_LENGTH.MAX)
  name: string;

  @Matches(phoneRegex)
  phoneNumber: string;

  @IsEmail()
  email: string;

  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  password: string;
}
