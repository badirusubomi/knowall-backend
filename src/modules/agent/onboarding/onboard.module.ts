import { Module } from '@nestjs/common';
import { AgentOnboardContoller } from './onboard.controller';
import { AgentOnboardService } from './onboard.service';

@Module({
  providers: [AgentOnboardService],
  controllers: [AgentOnboardContoller],
})
export class AgentOnboardModule {}
