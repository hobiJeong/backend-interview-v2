import { Controller } from '@nestjs/common';
import { UsersService } from 'src/apis/users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
