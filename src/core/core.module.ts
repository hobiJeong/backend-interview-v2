import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: ['dist/**/entities/*{.ts,.js}'],
      logging: true,
      timezone: '+00:00',
      username: 'root',
      password: 'admin',
      database: 'assignment',
      host: 'localhost',
      port: 3307,
      synchronize: true,
    }),
  ],
})
export class CoreModule {}
