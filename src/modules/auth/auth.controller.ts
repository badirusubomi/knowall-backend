import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDTO, CreateAgentDTO, LogInDto, UpdateAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/agent')
  createAgent(@Body() createAgentDto: CreateAgentDTO) {
    return this.authService.createAgent(createAgentDto);
  }

  @Post('/signup/admin')
  createAdmin(@Body() createAdminDto: CreateAdminDTO) {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('/login/agent')
  logInAgent(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @Post('/login/admin')
  logInAdmin(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateAgentDto: UpdateAuthDto) {
    return this.authService.updateAgent(email, updateAgentDto);
  }

  @Delete('/agent/:email')
  remove(@Param('email') email: string) {
    return this.authService.removeAgent(email);
  }
}
