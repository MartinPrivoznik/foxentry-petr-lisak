import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsPaged,
} from '../services/productsService';
import { ApiResponse, BaseApiResponse } from './dto/ApiResponse';
import { PagedList } from '../utils/dataStructures/PagedList';
import { IProduct } from '../models/Product';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Query,
  Route,
  Tags,
} from 'tsoa';
import GetProductsPagedRequestParams from './dto/requests/GetProductsPagedRequestParams';
import { validateData } from '../utils/validators/classValidator';
import { AddProductRequest } from './dto/requests/CreateProductRequest';
import { requestValidationMiddleware } from '../middleware/requestValidationMiddleware';

@Route('api/products')
@Tags('Products')
export class ProductsController extends Controller {
  @Get()
  public async getProductsPaged(
    @Query() page?: number,
    @Query() pageSize?: number
  ): Promise<ApiResponse<PagedList<IProduct>>> {
    const queryParams = new GetProductsPagedRequestParams();
    queryParams.page = page;
    queryParams.pageSize = pageSize;

    await validateData(queryParams, GetProductsPagedRequestParams);

    const products = await getProductsPaged(
      queryParams.page,
      queryParams.pageSize
    );
    return { success: true, data: products };
  }

  @Get('all')
  public async getAllProducts(): Promise<ApiResponse<IProduct[]>> {
    const products = await getAllProducts();
    return { success: true, data: products };
  }

  @Get('search')
  public async fulltextSearchProducts(
    @Query() query?: string
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
  @Middlewares([requestValidationMiddleware(AddProductRequest)])
  public async addProduct(
    @Body() req: AddProductRequest
  ): Promise<ApiResponse<IProduct>> {
    const res = await addProduct(req);
    return { success: true, data: res };
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
