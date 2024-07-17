import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column('varchar', {
    length: 100,
    comment: '상품 이름',
  })
  name: string;

  @Column('text', {
    comment: '상품 설명',
  })
  description: string;

  @Column('varchar', {
    comment: '상품 브랜드',
  })
  brand: string;

  @Column('int', {
    unsigned: true,
    comment: '상품 가격',
  })
  price: number;

  @Column('varchar', {
    comment: '상품 사이즈',
  })
  size: string;

  @Column('varchar', {
    length: 20,
    comment: '상품 색깔',
  })
  color: string;
}
