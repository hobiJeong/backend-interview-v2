import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/apis/auth/constants/auth.constant';
import { AuthController } from 'src/apis/auth/controllers/auth.controller';
import { AuthService } from 'src/apis/auth/services/auth.service';
import { UsersModule } from 'src/apis/users/users.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
