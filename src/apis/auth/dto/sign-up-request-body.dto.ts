import { IsEmail, IsPhoneNumber, Length, Matches } from 'class-validator';
import {
  phoneRegex,
  USER_NAME_LENGTH,
  USER_PASSWORD_LENGTH,
} from 'src/apis/users/constants/user.constant';
import { UserEntity } from 'src/entities/user.entity';

export class SignUpRequestBodyDto
  implements
    Omit<
      UserEntity,
      'id' | 'comparePassword' | 'status' | 'createdAt' | 'updatedAt'
    >
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
