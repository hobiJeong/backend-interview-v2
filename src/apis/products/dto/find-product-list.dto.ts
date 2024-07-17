import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';
import {
  PRODUCT_BRAND_LENGTH,
  PRODUCT_NAME_LENGTH,
} from 'src/apis/products/constants/product.constant';
import {
  ProductColor,
  ProductOrderField,
} from 'src/apis/products/constants/product.enum';
import { SortOrder } from 'src/common/constants/sort-order.enum';
import { PageDto } from 'src/common/dto/page.dto';
import { ProductEntity } from 'src/entities/product.entity';

export class FindProductListDto
  extends PageDto
  implements Partial<Pick<ProductEntity, 'brand' | 'name' | 'color' | 'id'>>
{
  @IsOptional()
  @IsUUID(7)
  id?: string;

  @IsOptional()
  @Length(PRODUCT_NAME_LENGTH.MIN, PRODUCT_NAME_LENGTH.MAX)
  name?: string;

  @IsOptional()
  @Length(PRODUCT_BRAND_LENGTH.MIN, PRODUCT_BRAND_LENGTH.MAX)
  brand?: string;

  @IsOptional()
  @IsEnum(ProductColor)
  color?: ProductColor;

  @IsOptional()
  @IsEnum(ProductOrderField)
  orderField: ProductOrderField = ProductOrderField.Id;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.ASC;
}
