import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { LogInDto } from './dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() payload: LogInDto) {
    return this.adminAuthService.login(payload);
  }
}
