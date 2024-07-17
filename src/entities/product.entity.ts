import { ProductColor } from 'src/apis/products/constants/product.enum';
import { BaseEntity } from 'src/entities/base.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column('varchar', {
    name: 'user_id',
    comment: '상품을 생성한 유저 id',
  })
  userId: string;

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

  @Column('enum', {
    enum: ProductColor,
    comment: '상품 색깔',
  })
  color: ProductColor;

  @ManyToOne(() => UserEntity, (user) => user.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
}
