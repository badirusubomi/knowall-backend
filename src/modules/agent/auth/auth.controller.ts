import { Body, Controller, Post } from '@nestjs/common';
import { AgentAuthService } from './auth.service';
import { LogInDto } from './dto/request.dto';

@Controller('agent/auth')
export class AgentAuthController {
  constructor(private agentAuthService: AgentAuthService) {}

  @Post('login')
  logInAgent(@Body() logInDto: LogInDto) {
    return this.agentAuthService.login(logInDto);
  }
}
