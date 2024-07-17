import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductReviewDto } from 'src/apis/products/product-reviews/dto/create-product-review.dto';
import { ProductReviewsRepository } from 'src/apis/products/product-reviews/repositories/product-reviews.repository';
import { ProductsService } from 'src/apis/products/services/products.service';
import { ProductReviewEntity } from 'src/entities/product-review.entity';

@Injectable()
export class ProductReviewsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productReviewsRepository: ProductReviewsRepository,
  ) {}

  async create(
    userId: string,
    productId: string,
    createProductReviewDto: CreateProductReviewDto,
  ) {
    const isExist = this.isExistBy(userId, productId);

    if (isExist) {
      throw new ConflictException("You've already written a review.");
    }

    return this.productReviewsRepository.create(
      ProductReviewEntity.create({
        userId,
        productId,
        ...createProductReviewDto,
      }),
    );
  }

  async isExistBy(userId: string, productId: string) {
    await this.productsService.isExistsOrNotFound(productId);

    return this.productReviewsRepository.isExistBy(userId, productId);
  }
}
