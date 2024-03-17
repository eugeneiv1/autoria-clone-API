import { UserResponseDto } from './user.response.dto';

export class UserListResponseDto {
  data: UserResponseDto[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}
