import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';
import { ProductLikesService } from 'src/apis/products/product-likes/services/product-likes.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@Controller('products/:productId/likes')
export class ProductLikesController {
  constructor(private readonly productLikesService: ProductLikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() user: UserEntity,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.productLikesService.create(user.id, productId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(
    @User() user: UserEntity,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.productLikesService.delete(user.id, productId);
  }
}
