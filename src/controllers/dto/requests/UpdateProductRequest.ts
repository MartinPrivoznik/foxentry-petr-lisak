import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IProduct } from '../../../models/Product';

export default class UpdateProductRequest implements IProduct {
  @IsMongoId()
  _id!: string;

  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with maximum of 2 decimal places' }
  )
  @Max(Number.MAX_VALUE)
  @Min(0)
  price!: number;

  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  stock!: number;
}
