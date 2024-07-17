import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptionsForPagination } from 'src/common/types/type';
import { ProductEntity, ProductModel } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  create(productEntity: ProductEntity) {
    const productModel = productEntity.toPersistence();

    return this.productsRepository.save(productModel);
  }

  findOneById(id: string) {
    return this.productsRepository.findOneBy({ id });
  }

  findAllByName(name: string) {
    return this.productsRepository.find({ where: { name } });
  }

  findAllAndCount(findManyOptions: FindManyOptionsForPagination<ProductModel>) {
    return this.productsRepository.findAndCount(findManyOptions);
  }

  update(productEntity: ProductEntity) {
    const productModel = productEntity.toPersistence();

    return this.productsRepository.update(
      { id: productModel.id },
      productModel,
    );
  }

  delete(productEntity: ProductEntity) {
    return this.productsRepository.delete({ id: productEntity.id });
  }
}
