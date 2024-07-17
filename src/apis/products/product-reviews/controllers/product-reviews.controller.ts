import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';
import { CreateProductReviewDto } from 'src/apis/products/product-reviews/dto/create-product-review.dto';
import { ProductReviewsService } from 'src/apis/products/product-reviews/services/product-reviews.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@Controller('products/:productId/reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() user: UserEntity,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productReviewsService.create(
      user.id,
      productId,
      createProductReviewDto,
    );
  }
}
