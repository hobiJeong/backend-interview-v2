import { IsOptional, Length, Max, Min } from 'class-validator';
import {
  PRODUCT_REVIEW_DESCRIPTION_LENGTH,
  PRODUCT_REVIEW_STAR_RATE_RANGE,
} from 'src/apis/products/product-reviews/constants/product-review.constant';
import type { ProductReviewModel } from 'src/entities/product-review.entity';

export class CreateProductReviewDto
  implements
    Pick<ProductReviewModel, 'starRate'>,
    Partial<Pick<ProductReviewModel, 'description'>>
{
  @IsOptional()
  @Length(
    PRODUCT_REVIEW_DESCRIPTION_LENGTH.MIN,
    PRODUCT_REVIEW_DESCRIPTION_LENGTH.MAX,
  )
  description: string;

  @Min(PRODUCT_REVIEW_STAR_RATE_RANGE.MIN)
  @Max(PRODUCT_REVIEW_STAR_RATE_RANGE.MAX)
  starRate: number;
}
