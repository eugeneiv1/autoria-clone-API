import { IsOptional } from 'class-validator';

export class RoleListRequestDto {
  @IsOptional()
  roles?: string[];
}
