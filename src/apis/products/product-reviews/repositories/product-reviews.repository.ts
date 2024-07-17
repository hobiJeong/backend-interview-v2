import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReviewEntity } from 'src/entities/product-review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductReviewsRepository {
  constructor(
    @InjectRepository(ProductReviewEntity)
    private readonly repository: Repository<ProductReviewEntity>,
  ) {}

  create(productReviewEntity: ProductReviewEntity) {
    const productReviewModel = productReviewEntity.toPersistence();

    return this.repository.save(productReviewModel);
  }

  isExistBy(userId: string, productId: string) {
    return this.repository.existsBy({ userId, productId });
  }
}
