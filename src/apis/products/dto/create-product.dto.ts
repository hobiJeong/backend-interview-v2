import { IsEnum, IsInt, IsPositive, Length } from 'class-validator';
import {
  PRODUCT_BRAND_LENGTH,
  PRODUCT_DESCRIPTION_LENGTH,
  PRODUCT_NAME_LENGTH,
  PRODUCT_SIZE_LENGTH,
} from 'src/apis/products/constants/product.constant';
import { ProductColor } from 'src/apis/products/constants/product.enum';
import { ProductEntity } from 'src/entities/product.entity';

export class CreateProductDto
  implements
    Pick<
      ProductEntity,
      'name' | 'description' | 'brand' | 'price' | 'size' | 'color'
    >
{
  @Length(PRODUCT_NAME_LENGTH.MIN, PRODUCT_NAME_LENGTH.MAX)
  name: string;

  @Length(PRODUCT_DESCRIPTION_LENGTH.MIN, PRODUCT_DESCRIPTION_LENGTH.MAX)
  description: string;

  @Length(PRODUCT_BRAND_LENGTH.MIN, PRODUCT_BRAND_LENGTH.MAX)
  brand: string;

  @IsInt()
  @IsPositive()
  price: number;

  @Length(PRODUCT_SIZE_LENGTH.MIN, PRODUCT_SIZE_LENGTH.MAX)
  size: string;

  @IsEnum(ProductColor)
  color: ProductColor;
}
