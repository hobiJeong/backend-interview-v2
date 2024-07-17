import { ProductEntity } from 'src/entities/product.entity';

export const PRODUCT_NAME_LENGTH = {
  MIN: 1,
  MAX: 100,
} as const;

export const PRODUCT_DESCRIPTION_LENGTH = {
  MIN: 1,
  MAX: 255,
} as const;

export const PRODUCT_BRAND_LENGTH = {
  MIN: 1,
  MAX: 255,
} as const;

export const PRODUCT_SIZE_LENGTH = {
  MIN: 1,
  MAX: 255,
} as const;
