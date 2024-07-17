import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { ApisModule } from 'src/apis/apis.module';
import { PaginationInterceptorModule } from 'src/interceptors/pagination-interceptor/pagination-interceptor.module';

@Module({
  imports: [CoreModule, ApisModule, PaginationInterceptorModule],
})
export class AppModule {}
