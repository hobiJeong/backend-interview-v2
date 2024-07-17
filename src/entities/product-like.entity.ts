import { OmitType } from '@nestjs/mapped-types';
import { BaseEntity } from 'src/entities/base.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_like')
export class ProductLikeEntity extends OmitType(BaseEntity, ['updatedAt']) {
  @Column('varchar', {
    name: 'product_id',
    comment: '상품 고유 ID',
  })
  productId: string;

  @Column('varchar', {
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.productLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: ProductEntity;
}
