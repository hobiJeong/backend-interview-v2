import { Module } from '@nestjs/common';
import { ProductReviewsService } from './services/product-reviews.service';
import { ProductsModule } from 'src/apis/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewEntity } from 'src/entities/product-review.entity';
import { ProductReviewsController } from 'src/apis/products/product-reviews/controllers/product-reviews.controller';
import { ProductReviewsRepository } from 'src/apis/products/product-reviews/repositories/product-reviews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReviewEntity]), ProductsModule],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService, ProductReviewsRepository],
})
export class ProductReviewsModule {}
