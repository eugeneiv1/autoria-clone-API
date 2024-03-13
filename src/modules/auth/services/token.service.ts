import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JWTConfig } from '../../../configs/config.type';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { ETokenType } from '../enums/token-type.enum';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class TokenService {
  private jwtConfig: JWTConfig;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async generateTokenPair(
    payload: JwtPayloadType,
  ): Promise<TokenResponseDto> {
    const accessToken = await this.generateToken(payload, ETokenType.ACCESS);
    const refreshToken = await this.generateToken(payload, ETokenType.REFRESH);
    return { accessToken, refreshToken };
  }

  public async generateToken(
    payload: JwtPayloadType,
    tokenType: ETokenType,
  ): Promise<string> {
    let secret: string;
    let expiresIn: number;
    switch (tokenType) {
      case ETokenType.ACCESS:
        secret = this.jwtConfig.accessTokenSecret;
        expiresIn = this.jwtConfig.accessTokenExpiration;
        break;
      case ETokenType.REFRESH:
        secret = this.jwtConfig.refreshTokenSecret;
        expiresIn = this.jwtConfig.refreshTokenExpiration;
        break;
    }
    return await this.jwtService.signAsync(payload, { secret, expiresIn });
  }
}
