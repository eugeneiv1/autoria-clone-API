import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { AuthResponseDto } from './dto/response/auth.response.dto';
import { TokenResponseDto } from './dto/response/token.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Register' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpRequestDto): Promise<void> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(@Body() dto: SignInRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() currentUser: IUserData): Promise<void> {
    return await this.authService.logout(currentUser);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh tokens' })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshTokens(
    @CurrentUser() currentUser: IUserData,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshTokenPair(currentUser);
  }
}
