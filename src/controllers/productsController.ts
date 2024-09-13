import {
  deleteProduct,
  getAllProducts,
  getProductsPaged,
} from '../services/productsService';
import { ApiResponse, BaseApiResponse } from './dto/ApiResponse';
import { PagedList } from '../utils/dataStructures/PagedList';
import { IProduct } from '../models/Product';
import {
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Tags,
} from 'tsoa';

@Route('api/products')
@Tags('Products')
export class ProductsController extends Controller {
  @Get()
  public async getProductsPaged(
    @Query() page?: number,
    @Query() pageSize?: number
  ): Promise<ApiResponse<PagedList<IProduct>>> {
    const products = await getProductsPaged(page, pageSize);
    return { success: true, data: products };
  }

  @Get('all')
  public async getAllProducts(): Promise<ApiResponse<IProduct[]>> {
    const products = await getAllProducts();
    return { success: true, data: products };
  }

  @Get('search')
  public async fulltextSearchProducts(
    @Query() query: string
  ): Promise<ApiResponse<IProduct[]>> {
    throw new Error('Not implemented');
  }

  @Get('searchByStockQuantity')
  public async searchProductsByStockQuantity(): Promise<
    ApiResponse<IProduct[]>
  > {
    throw new Error('Not implemented');
  }

  @Post('add')
  public async addProduct(): Promise<BaseApiResponse> {
    throw new Error('Not implemented');
  }

  @Put('update')
  public async updateProduct(): Promise<BaseApiResponse> {
    throw new Error('Not implemented');
  }

  @Delete('delete/{id}')
  public async deleteProduct(@Path() id: string): Promise<BaseApiResponse> {
    await deleteProduct(id);
    return { success: true, message: 'Product deleted' };
  }
}
