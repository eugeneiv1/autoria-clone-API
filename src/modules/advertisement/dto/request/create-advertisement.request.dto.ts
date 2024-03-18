import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateAdvertisementRequestDto {
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(3, 2000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @IsNumber()
  @Min(1)
  @Max(1000000)
  price: number;

  @IsString()
  @Transform(TransformHelper.toUpperCase)
  currency: string;

  @IsString()
  user_Id: string;

  @IsString()
  brand_Id: string;

  @IsString()
  model_Id: string;

  @IsString()
  region_Id: string;
}
