import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentProfileModule } from './profile';
import { AgentOnboardModule } from './onboarding';
import { AgentAuthModule } from './auth';

@Module({
  providers: [AgentService],
  imports: [AgentProfileModule, AgentOnboardModule, AgentAuthModule],
})
export class AgentModule {}
