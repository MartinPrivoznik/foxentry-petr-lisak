import { ApiResponse } from './dto/ApiResponse';
import { Controller, Get, Path, Route, Tags } from 'tsoa';
import * as priceChangesService from '../services/priceChangesService';
import { IProductPriceHistory } from '../models/ProductPriceHistory';

@Route('api/priceChanges')
@Tags('Price changes')
export class PriceChangesController extends Controller {
  /**
   * Retrieves all records of price changes for all products.
   */
  @Get()
  public async getAllPriceChanges(): Promise<
    ApiResponse<IProductPriceHistory[]>
  > {
    const priceChanges = await priceChangesService.getAllPriceChangeRecords();
    return { success: true, data: priceChanges };
  }

  /**
   * Retrieves all records of price changes for single product by its id.
   * @example productId "5f4f5b3b4f5b3b4f5b3b4f5b"
   */
  @Get('/{productId}')
  public async getPriceChangesByProductId(
    @Path() productId: string
  ): Promise<ApiResponse<IProductPriceHistory[]>> {
    const priceChanges =
      await priceChangesService.getAllPriceChangeRecordsForProduct(productId);
    return { success: true, data: priceChanges };
  }
}
