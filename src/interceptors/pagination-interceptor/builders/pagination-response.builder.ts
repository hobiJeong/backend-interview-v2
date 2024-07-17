import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PAGE_SIZE } from 'src/common/constants/page-size.constant';
import { PageDto } from 'src/common/dto/page.dto';
import { PaginationResponseDto } from 'src/interceptors/pagination-interceptor/dto/pagination-response.dto';

interface Res {
  data: unknown;
  key: string;
}

@Injectable()
export class PaginationResponseBuilder {
  /**
   * array type 만 허용합니다.
   */
  pagination(res: Res, pageDto: PageDto) {
    const { data } = res;

    if (!Array.isArray(data)) {
      console.error('pagination response build 중 data 가 array type 이 아님');

      throw new InternalServerErrorException(
        'Server error. Please contact server developer',
      );
    }

    const [array, totalCount] = data;

    if (!Array.isArray(array)) {
      console.error(
        'pagination response build 중 조회된 객체가 array type 이 아님',
      );

      throw new InternalServerErrorException(
        'Server error. Please contact server developer',
      );
    }

    if (typeof totalCount !== 'number') {
      console.error(
        'pagination response build 중 totalCount 가 number type 이 아님',
      );

      throw new InternalServerErrorException(
        'Server error. Please contact server developer',
      );
    }

    if (!Number.isInteger(totalCount)) {
      console.error(
        'pagination response build 중 totalCount 가 integer format 이 아님',
      );

      throw new InternalServerErrorException(
        'Server error. Please contact server developer',
      );
    }

    const currentPage = Number(pageDto.page) || 1;
    const pageSize = Number(pageDto.pageSize) || PAGE_SIZE.DEFAULT;
    const nextPage =
      pageSize * currentPage < totalCount ? currentPage + 1 : null;
    const hasNext = pageSize * currentPage < totalCount;
    const lastPage = Math.ceil(totalCount / pageSize);

    return new PaginationResponseDto(
      { key: array },
      {
        totalCount,
        currentPage,
        pageSize,
        nextPage,
        hasNext,
        lastPage,
      },
    );
  }
}
