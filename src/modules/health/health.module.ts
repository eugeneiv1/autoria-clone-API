import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { HealthController } from './health.controller';

@Module({
  imports: [UserModule],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
