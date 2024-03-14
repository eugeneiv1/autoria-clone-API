import { UserEntity } from '../../../database/entities/user.entity';
import { TokenResponseDto } from '../dto/response/token.response.dto';

export class AuthMapper {
  // entity can be 2 types in future
  public static toAuthResponse(entity: UserEntity, tokens: TokenResponseDto) {
    return {
      user: entity.id,
      tokens,
    };
  }
}
