import { Module } from '@nestjs/common';
import { PaginationResponseBuilder } from 'src/interceptors/pagination-interceptor/builders/pagination-response.builder';
import { PaginationInterceptor } from 'src/interceptors/pagination-interceptor/pagination.interceptor';

@Module({
  providers: [PaginationResponseBuilder, PaginationInterceptor],
})
export class PaginationInterceptorModule {}
