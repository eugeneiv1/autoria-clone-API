import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserListResponseDto } from '../dto/response/user-list.response.dto';

export class UserMapper {
  public static userToResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      roles: user.roles,
      sent: user.sent,
      inbox: user.inbox,
    };
  }

  public static userListToResponse(
    users: UserEntity[],
    total: number,
    query: UserListRequestDto,
  ): UserListResponseDto {
    return {
      data: users.map(this.userToResponse),
      meta: {
        limit: query.limit,
        page: query.page,
        total,
      },
    };
  }
}
