import { ConflictException, Injectable } from '@nestjs/common';
import { ProductLikesRepository } from 'src/apis/products/product-likes/repositories/product-likes.repository';
import { ProductsService } from 'src/apis/products/services/products.service';
import { ProductLikeEntity } from 'src/entities/product-like.entity';

@Injectable()
export class ProductLikesService {
  constructor(
    private readonly productLikesRepository: ProductLikesRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(userId: string, productId: string) {
    const isExist = await this.isExistBy(userId, productId);

    if (isExist) {
      throw new ConflictException("You've already liked the product.");
    }

    return this.productLikesRepository.create(
      ProductLikeEntity.create({ userId, productId }),
    );
  }

  async isExistBy(userId: string, productId: string) {
    await this.productsService.isExistsOrNotFound(productId);

    return this.productLikesRepository.isExistBy(userId, productId);
  }

  async delete(userId: string, productId: string) {
    const isExist = await this.isExistBy(userId, productId);

    if (!isExist) {
      throw new ConflictException(
        "You've already cancelled a like for a product",
      );
    }

    return this.productLikesRepository.delete(userId, productId);
  }
}
