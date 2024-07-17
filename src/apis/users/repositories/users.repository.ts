import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/apis/users/constants/user.enum';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  create(userEntity: UserEntity) {
    return this.usersRepository.save(userEntity);
  }

  findOneById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findByEmailOrPhoneNumber(email: string, phoneNumber: string) {
    return this.usersRepository.find({
      where: [
        {
          email,
          status: UserStatus.ACTIVE,
        },
        { phoneNumber, status: UserStatus.ACTIVE },
      ],
    });
  }
}
