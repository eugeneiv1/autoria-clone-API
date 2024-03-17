import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

import { TransformHelper } from '../helpers/transform.helper';

export class AddNewItemsRequestDto {
  @IsArray()
  @IsString({ each: true })
  @Length(1, 15, { each: true })
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueArrayItems)
  @Type(() => String)
  names: string[];

  @IsString()
  @IsOptional()
  id?: string;
}
