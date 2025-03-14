import { Module } from '@nestjs/common';
import { AgentAuthController } from './auth.controller';
import { AgentAuthService } from './auth.service';
import { Agent, CommonHelpers, LoginActivity, Organization } from 'src/lib';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AgentAuthService, CommonHelpers],
  imports: [TypeOrmModule.forFeature([Agent, Organization, LoginActivity])],
  controllers: [AgentAuthController],
})
export class AgentAuthModule {}
