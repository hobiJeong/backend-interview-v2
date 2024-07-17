import { FindManyOptions, FindOptionsWhere, FindOptionsOrder } from 'typeorm';

export interface FindManyOptionsForPagination<E extends Record<string, any>>
  extends Required<
      Pick<FindManyOptions<E>, 'skip' | 'take' | 'order' | 'where'>
    >,
    FindManyOptions<E> {
  where: FindOptionsWhere<E>[] | FindOptionsWhere<E>;
  order: FindOptionsOrder<E>;
  skip: number;
  take: number;
}
