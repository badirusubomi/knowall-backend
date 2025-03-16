import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { AgentAuthService } from './auth.service';
import { LogInDto } from './dto/request.dto';

@Controller('agent/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class AgentAuthController {
  constructor(private agentAuthService: AgentAuthService) {}

  @Post('login')
  logInAgent(@Body() logInDto: LogInDto) {
    return this.agentAuthService.login(logInDto);
  }
}
