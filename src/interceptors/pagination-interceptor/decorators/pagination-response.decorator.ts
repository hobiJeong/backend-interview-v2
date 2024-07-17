import { SetMetadata } from '@nestjs/common';
import { SET_PAGINATION_RESPONSE } from 'src/interceptors/pagination-interceptor/constants/pagination-interceptor.constant';

export const SetPaginationResponse = (key: string) => {
  return SetMetadata(SET_PAGINATION_RESPONSE, key);
};
