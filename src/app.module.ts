import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { ApisModule } from 'src/apis/apis.module';

@Module({
  imports: [CoreModule, ApisModule],
})
export class AppModule {}
