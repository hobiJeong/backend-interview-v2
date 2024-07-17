import { ProductColor } from 'src/apis/products/constants/product.enum';
import { BaseEntity } from 'src/entities/base.entity';
import { ProductLikeEntity } from 'src/entities/product-like.entity';
import { ProductReviewEntity } from 'src/entities/product-review.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { v7 } from 'uuid';

export type ProductModel = Omit<
  ProductEntity,
  | 'updateProductInfo'
  | 'toPersistence'
  | 'user'
  | 'productLikes'
  | 'productReviews'
> &
  Pick<Partial<ProductEntity>, 'productLikes'>;

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

  @OneToMany(() => ProductLikeEntity, (productLikes) => productLikes.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productLikes: ProductLikeEntity[];

  @OneToMany(
    () => ProductReviewEntity,
    (productReviews) => productReviews.user,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  productReviews: ProductReviewEntity[];

  static create(
    createProps: Pick<
      ProductEntity,
      'name' | 'description' | 'brand' | 'color' | 'price' | 'size' | 'userId'
    >,
  ) {
    const { name, description, brand, color, price, size, userId } =
      createProps;

    const productEntity = new ProductEntity();

    productEntity.id = v7();
    productEntity.name = name;
    productEntity.description = description;
    productEntity.brand = brand;
    productEntity.color = color;
    productEntity.price = price;
    productEntity.size = size;
    productEntity.userId = userId;
    productEntity.createdAt = new Date();
    productEntity.updatedAt = new Date();

    return productEntity;
  }

  updateProductInfo(
    updateProps: Partial<
      Pick<
        ProductEntity,
        'name' | 'description' | 'brand' | 'color' | 'price' | 'size'
      >
    >,
  ) {
    const { name, description, brand, color, price, size } = updateProps;

    if (name) {
      this.name = name;
    }
    if (description) {
      this.description = description;
    }
    if (brand) {
      this.brand = brand;
    }
    if (color) {
      this.color = color;
    }
    if (price) {
      this.price = price;
    }
    if (size) {
      this.size = size;
    }
    this.updatedAt = new Date();
  }

  toPersistence(): ProductModel {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      description: this.description,
      brand: this.brand,
      color: this.color,
      size: this.size,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
