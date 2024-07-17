import { BaseEntity } from 'src/entities/base.entity';
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

export type ProductReviewModel = Omit<
  ProductReviewEntity,
  'create' | 'toPersistence' | 'user' | 'product'
>;

@Entity('product_reviews')
export class ProductReviewEntity extends BaseEntity {
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

  @Column('varchar', {
    comment: '리뷰 내용',
    nullable: true,
  })
  description: string;

  @Column('int', {
    name: 'star_rate',
    comment: '리뷰 별점',
    unsigned: true,
  })
  starRate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.productReviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productReviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: ProductEntity;

  static create(
    createProps: Pick<
      ProductReviewEntity,
      'productId' | 'userId' | 'starRate' | 'description'
    >,
  ) {
    const { productId, userId, starRate, description } = createProps;

    const productReviewEntity = new ProductReviewEntity();

    productReviewEntity.id = v7();
    productReviewEntity.userId = userId;
    productReviewEntity.productId = productId;
    productReviewEntity.starRate = starRate;
    productReviewEntity.description = description;
    productReviewEntity.createdAt = new Date();
    productReviewEntity.updatedAt = new Date();

    return productReviewEntity;
  }

  toPersistence(): ProductReviewModel {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId,
      starRate: this.starRate,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
