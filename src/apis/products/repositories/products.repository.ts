import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptionsForPagination } from 'src/common/types/type';
import { ProductEntity, ProductModel } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  create(productEntity: ProductEntity) {
    const productModel = productEntity.toPersistence();

    return this.repository.save(productModel);
  }

  findOneById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findAllByName(name: string) {
    return this.repository.find({ where: { name } });
  }

  findAllAndCount(findManyOptions: FindManyOptionsForPagination<ProductModel>) {
    return this.repository.findAndCount(findManyOptions);
  }

  isExistsBy(id: string) {
    return this.repository.existsBy({ id });
  }

  update(productEntity: ProductEntity) {
    const productModel = productEntity.toPersistence();

    return this.repository.update({ id: productModel.id }, productModel);
  }

  delete(productEntity: ProductEntity) {
    return this.repository.delete({ id: productEntity.id });
  }
}
