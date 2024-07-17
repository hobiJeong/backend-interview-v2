import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v7 } from 'uuid';

export type ProductLikeModel = Omit<
  ProductLikeEntity,
  'toPersistence' | 'user' | 'product'
>;

@Entity('product_likes')
export class ProductLikeEntity {
  @Column('varchar', {
    comment: '고유 ID',
    primary: true,
  })
  id: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

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

  static create(createProps: Pick<ProductLikeEntity, 'productId' | 'userId'>) {
    const { productId, userId } = createProps;

    const productLikeEntity = new ProductLikeEntity();

    productLikeEntity.id = v7();
    productLikeEntity.userId = userId;
    productLikeEntity.productId = productId;
    productLikeEntity.createdAt = new Date();

    return productLikeEntity;
  }

  toPersistence(): ProductLikeModel {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId,
      createdAt: this.createdAt,
    };
  }
}
