import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLikesController } from 'src/apis/products/product-likes/controllers/product-likes.controller';
import { ProductLikesRepository } from 'src/apis/products/product-likes/repositories/product-likes.repository';
import { ProductLikesService } from 'src/apis/products/product-likes/services/product-likes.service';
import { ProductsModule } from 'src/apis/products/products.module';
import { ProductLikeEntity } from 'src/entities/product-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLikeEntity]), ProductsModule],
  controllers: [ProductLikesController],
  providers: [ProductLikesService, ProductLikesRepository],
})
export class ProductLikesModule {}
