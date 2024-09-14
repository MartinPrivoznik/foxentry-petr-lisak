import * as productsService from '../services/productsService';
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
import UpdateProductRequest from './dto/requests/UpdateProductRequest';
import GetSearchProductsByStockQuantityParams from './dto/requests/GetSearchProductsByStockQuantityParams';

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

    const products = await productsService.getProductsPaged(
      queryParams.page,
      queryParams.pageSize
    );
    return { success: true, data: products };
  }

  @Get('all')
  public async getAllProducts(): Promise<ApiResponse<IProduct[]>> {
    const products = await productsService.getAllProducts();
    return { success: true, data: products };
  }

  @Get('search')
  public async fulltextSearchProducts(
    @Query() query?: string
  ): Promise<ApiResponse<IProduct[]>> {
    const products = await productsService.fulltextSearchProducts(query);
    return { success: true, data: products };
  }

  @Get('searchByStockQuantity')
  public async searchProductsByStockQuantity(
    @Query() min?: number,
    @Query() max?: number
  ): Promise<ApiResponse<IProduct[]>> {
    const queryParams = new GetSearchProductsByStockQuantityParams();
    queryParams.min = min || queryParams.min;
    queryParams.max = max || queryParams.max;

    await validateData(queryParams, GetSearchProductsByStockQuantityParams);

    const res = await productsService.searchProductsByStockQuantity(
      queryParams.min,
      queryParams.max
    );
    return { success: true, data: res };
  }

  @Post('add')
  @Middlewares([requestValidationMiddleware(AddProductRequest)])
  public async addProduct(
    @Body() req: AddProductRequest
  ): Promise<ApiResponse<IProduct>> {
    const res = await productsService.addProduct(req);
    return { success: true, data: res, message: 'Product added' };
  }

  @Put('update')
  @Middlewares([requestValidationMiddleware(UpdateProductRequest)])
  public async updateProduct(
    @Body() req: UpdateProductRequest
  ): Promise<BaseApiResponse> {
    await productsService.updateProduct(req);
    return {
      success: true,
      message: 'Product updated',
    };
  }

  @Delete('delete/{id}')
  public async deleteProduct(@Path() id: string): Promise<BaseApiResponse> {
    await productsService.deleteProduct(id);
    return { success: true, message: 'Product deleted' };
  }
}
