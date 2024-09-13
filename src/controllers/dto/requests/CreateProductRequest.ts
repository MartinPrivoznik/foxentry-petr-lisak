import {
  IsEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IProduct } from '../../../models/Product';

export class AddProductRequest implements IProduct {
  @IsOptional()
  @IsEmpty()
  _id?: string;

  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(Number.MAX_VALUE)
  @Min(0)
  price!: number;

  @IsInt()
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  stock!: number;
}
