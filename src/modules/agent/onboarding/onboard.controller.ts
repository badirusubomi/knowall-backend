import { Controller } from '@nestjs/common';
import { AgentOnboardService } from './onboard.service';

@Controller('agent/onboard')
export class AgentOnboardContoller {
  constructor(private onboardService: AgentOnboardService) {}
}
