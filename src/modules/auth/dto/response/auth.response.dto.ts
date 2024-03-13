import { TokenResponseDto } from './token.response.dto';

export class AuthResponseDto {
  tokens: TokenResponseDto;
  user: any;
}
