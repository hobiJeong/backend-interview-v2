import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { FindProductListDto } from 'src/apis/products/dto/find-product-list.dto';
import { PatchUpdateProductDto } from 'src/apis/products/dto/patch-update-product.dto';
import { PAGE_SIZE } from 'src/common/constants/page-size.constant';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: UserEntity, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(user.id, createProductDto);
  }

  @Get()
  async findAllAndCount(@Query() findProductListDto: FindProductListDto) {
    const [products, totalCount] = await this.productsService.findAllAndCount(
      findProductListDto,
    );

    const currentPage = Number(findProductListDto.page) || 1;
    const pageSize = Number(findProductListDto.pageSize) || PAGE_SIZE.DEFAULT;
    const nextPage =
      pageSize * currentPage < totalCount ? currentPage + 1 : null;
    const hasNext = pageSize * currentPage < totalCount;
    const lastPage = Math.ceil(totalCount / pageSize);

    return new PaginationResponseDto(
      { products },
      {
        totalCount,
        currentPage,
        pageSize,
        nextPage,
        hasNext,
        lastPage,
      },
    );
  }

  @Get(':productId')
  findOne(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.findOneOrNotFound(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':productId')
  patchUpdate(
    @User() user: UserEntity,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() patchUpdateProductDto: PatchUpdateProductDto,
  ) {
    return this.productsService.patchUpdate(
      user.id,
      productId,
      patchUpdateProductDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  delete(
    @User() user: UserEntity,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.productsService.delete(user.id, productId);
  }
}
