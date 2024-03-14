import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignInRequestDto } from '../dto/request/sign-in.request.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.request.dto';
import { AuthResponseDto } from '../dto/response/auth.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}
  public async signUp(dto: SignUpRequestDto): Promise<void> {
    await this.userService.isEmailUnique(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 7);

    await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hashedPassword }),
    );
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { password: true, id: true },
    });

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokenPair = await this.tokenService.generateTokenPair({
      userId: user.id,
      deviceId: dto.deviceId,
      roles: user.roles,
    });

    await this.tokenService.saveTokens(user.id, dto.deviceId, tokenPair);

    return AuthMapper.toAuthResponse(user, tokenPair);
  }

  public async logout(user: IUserData): Promise<void> {
    await this.tokenService.deleteTokens(user.userId, user.deviceId);
  }

  public async refreshTokenPair(currentUser: IUserData) {
    await this.tokenService.deleteTokens(
      currentUser.userId,
      currentUser.deviceId,
    );

    const tokenPair = await this.tokenService.generateTokenPair({
      userId: currentUser.userId,
      deviceId: currentUser.deviceId,
      roles: currentUser.roles,
    });

    await this.tokenService.saveTokens(
      currentUser.userId,
      currentUser.deviceId,
      tokenPair,
    );

    return tokenPair;
  }
}
