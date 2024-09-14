import { ApiResponse } from './dto/ApiResponse';
import { Controller, Get, Route, Tags } from 'tsoa';
import * as priceChangesService from '../services/priceChangesService';
import { IProductPriceHistory } from '../models/ProductPriceHistory';

@Route('api/priceChanges')
@Tags('Price changes')
export class PriceChangesController extends Controller {
  /**
   * Retrieves all records of price changes for all products.
   * Mostly here so you dont have to check directly in the database if it works ;)
   */
  @Get()
  public async getAllPriceChanges(): Promise<
    ApiResponse<IProductPriceHistory[]>
  > {
    const priceChanges = await priceChangesService.getAllPriceChangeRecords();
    return { success: true, data: priceChanges };
  }
}
