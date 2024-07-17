import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from 'src/apis/products/repositories/products.repository';
import { ProductEntity } from 'src/entities/product.entity';
import { FindProductListDto } from 'src/apis/products/dto/find-product-list.dto';
import { Like } from 'typeorm';
import { isNil } from 'src/common/common';
import { PatchUpdateProductDto } from 'src/apis/products/dto/patch-update-product.dto';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    const existProducts = await this.productsRepository.findAllByName(
      createProductDto.name,
    );

    existProducts.map((product) => {
      if (product && product.color === createProductDto.color) {
        throw new ConflictException('A product of that color already exists.');
      }

      return product;
    });

    return this.productsRepository.create(
      ProductEntity.create({ ...createProductDto, userId }),
    );
  }

  async findOneOrNotFound(id: string) {
    const existProduct = await this.productsRepository.findOneById(id);

    if (isNil(existProduct)) {
      throw new NotFoundException("The product doesn't exist.");
    }

    return existProduct;
  }

  async isExistsOrNotFound(id: string) {
    const isExist = await this.productsRepository.isExistsBy(id);

    if (!isExist) {
      throw new NotFoundException("The product doesn't exist.");
    }

    return isExist;
  }

  findAllAndCount(findProductListDto: FindProductListDto) {
    const { page, pageSize, orderField, sortOrder, id, name, brand, color } =
      findProductListDto;

    return this.productsRepository.findAllAndCount({
      where: {
        id,
        name: name && Like(`%${name}%`),
        brand: brand && Like(`%${brand}%`),
        color,
      },
      skip: page * pageSize,
      take: pageSize,
      order: {
        [orderField]: sortOrder,
      },
      relations: {
        productLikes: true,
      },
    });
  }

  async patchUpdate(
    userId: string,
    productId: string,
    patchUpdateProductDto: PatchUpdateProductDto,
  ) {
    if (!isNotEmptyObject(patchUpdateProductDto)) {
      throw new BadRequestException('At least one update field must exist.');
    }

    const existProduct = await this.findOneOrNotFound(productId);

    if (existProduct.userId !== userId) {
      throw new ForbiddenException('You do not have access to this product.');
    }

    existProduct.updateProductInfo(patchUpdateProductDto);

    await this.productsRepository.update(existProduct);

    return existProduct;
  }

  async delete(userId: string, productId: string) {
    const existProduct = await this.findOneOrNotFound(productId);

    if (existProduct.userId !== userId) {
      throw new ForbiddenException('You do not have access to this product.');
    }

    await this.productsRepository.delete(existProduct);

    return existProduct.id;
  }
}
