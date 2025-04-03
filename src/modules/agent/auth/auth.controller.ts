import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { AgentAuthService } from './auth.service';
import { LogInDto } from './dto/request.dto';

@Controller('agent/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class AgentAuthController {
  constructor(private agentAuthService: AgentAuthService) {}

  @Get('/me')
  async getLoggedInAdmin() {
    return this.agentAuthService.getLoggedInAgent();
  }

  @Post('login')
  async logInAgent(@Body() logInDto: LogInDto) {
    return await this.agentAuthService.login(logInDto);
  }
}
