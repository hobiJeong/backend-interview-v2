import { ConflictException, Injectable } from '@nestjs/common';
import { UserCreateDto } from 'src/apis/users/dto/user-create.dto';
import { UsersRepository } from 'src/apis/users/repositories/users.repository';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userCreateDto: UserCreateDto) {
    const { name, phoneNumber, email, password } = userCreateDto;

    await this.checkUserDuplicated(email, password);

    return this.usersRepository.create(
      await UserEntity.create(name, phoneNumber, email, password),
    );
  }

  findOneById(id: string) {
    return this.usersRepository.findOneById(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  private async checkUserDuplicated(
    email: string,
    phoneNumber: string,
  ): Promise<true> {
    const existUser = await this.usersRepository.findByEmailOrPhoneNumber(
      email,
      phoneNumber,
    );

    existUser.map((user) => {
      if ((user.email = email)) {
        throw new ConflictException('An email that already exists.');
      }

      if ((user.phoneNumber = phoneNumber)) {
        throw new ConflictException('A phone number that already exists.');
      }
    });

    return true;
  }
}
