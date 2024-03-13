import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async signUp(dto: SignUpRequestDto) {
    let entity: any; // declare as let to define it later depending on user is single seller or dealer
    await this.userService.isEmailUnique(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 7);

    // Check if registered user is Dealer to create not standard user but dealer
    if (dto.isDealer) {
      // entity = await this.dealerRepository.save(
      // this.dealerRepository.create({...dto, password: hashedPassword})
    } else {
      entity = await this.userRepository.save(
        this.userRepository.create({ ...dto, password: hashedPassword }),
      );
    }

    const tokenPair = await this.tokenService.generateTokenPair({
      userId: entity.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.authCacheService.saveAccessToken(
        entity.id,
        dto.deviceId,
        tokenPair.accessToken,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_Id: entity.id,
          refreshToken: tokenPair.refreshToken,
          deviceId: dto.deviceId,
        }),
      ),
    ]);

    return AuthMapper.toAuthResponse(entity, tokenPair);
  }
}
