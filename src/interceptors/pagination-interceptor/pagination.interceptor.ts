import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageDto } from 'src/common/dto/page.dto';
import { PaginationResponseBuilder } from 'src/interceptors/pagination-interceptor/builders/pagination-response.builder';
import { SET_PAGINATION_RESPONSE } from 'src/interceptors/pagination-interceptor/constants/pagination-interceptor.constant';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly responseBuilder: PaginationResponseBuilder,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        const key = this.reflector.get<string>(
          SET_PAGINATION_RESPONSE,
          context.getHandler(),
        );

        // key가 없으면 해당 인터셉터를 사용하지 않는다고 판별한다.
        if (key) return data;

        // pagination api response

        const request = context.switchToHttp().getRequest();
        const { query } = request;
        const { page, pageSize }: PageDto = query;

        return this.responseBuilder.pagination(
          { data, key },
          { page, pageSize },
        );
      }),
    );
  }
}
