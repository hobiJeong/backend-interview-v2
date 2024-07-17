import { Module } from '@nestjs/common';
import { AuthModule } from 'src/apis/auth/auth.module';
import { ProductsModule } from 'src/apis/products/products.module';
import { UsersModule } from 'src/apis/users/users.module';

@Module({
  imports: [AuthModule, ProductsModule, UsersModule],
})
export class ApisModule {}
