import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { SuperUserConfig } from '../../../configs/config.type';
import { EAccountType } from '../../../database/entities/enums/account-type';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class SuperUserSeedService implements OnModuleInit {
  private superUserConfig: SuperUserConfig;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    this.superUserConfig = this.configService.get<SuperUserConfig>('superUser');
  }
  async onModuleInit(): Promise<void> {
    const isExist = await this.userRepository.findOneBy({
      email: this.superUserConfig.email,
    });
    if (isExist) {
      return;
    }
    const hashedPassword = await bcrypt.hash(this.superUserConfig.password, 7);

    await this.userRepository.save(
      this.userRepository.create({
        userName: 'admin',
        email: this.superUserConfig.email,
        password: hashedPassword,
        roles: ['admin'],
        account_type: EAccountType.PAID,
      }),
    );
  }
}
