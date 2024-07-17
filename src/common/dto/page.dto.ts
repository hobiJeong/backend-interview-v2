import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { transformPage } from 'src/common/common';
import { PAGE_SIZE } from 'src/common/constants/page-size.constant';

/**
 * pagination 을 구현하는 request query dto 에 상속받아 사용합니다.
 */
export class PageDto {
  @IsOptional()
  @Min(0)
  @IsInt()
  @Transform(transformPage)
  page = 0;

  @IsOptional()
  @Max(PAGE_SIZE.MAXIMUM)
  @Min(1)
  @IsInt()
  @Type(() => Number)
  pageSize = PAGE_SIZE.DEFAULT;
}
