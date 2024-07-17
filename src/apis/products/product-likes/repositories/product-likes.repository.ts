import { InjectRepository } from '@nestjs/typeorm';
import { ProductLikeEntity } from 'src/entities/product-like.entity';
import { Repository } from 'typeorm';

export class ProductLikesRepository {
  constructor(
    @InjectRepository(ProductLikeEntity)
    private readonly repository: Repository<ProductLikeEntity>,
  ) {}

  create(productLikeEntity: ProductLikeEntity) {
    const productLikeModel = productLikeEntity.toPersistence();

    return this.repository.save(productLikeModel);
  }

  isExistBy(userId: string, productId: string) {
    return this.repository.existsBy({ userId, productId });
  }

  delete(userId: string, productId: string) {
    return this.repository.delete({ userId, productId });
  }
}
