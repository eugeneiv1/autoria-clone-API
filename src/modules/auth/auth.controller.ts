import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Register' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpRequestDto) {
    return await this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn() {}

  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout() {}

  @ApiOperation({ summary: 'Refresh tokens' })
  @Post('refresh')
  public async refreshTokens() {}
}
