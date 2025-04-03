import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';
import { IsString } from 'class-validator';

class RefreshTokenDto {
  @IsString()
  token: string;
}

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHello(): string {
    return this.appService.getHello();
  }

  // Bad code ??? I really don't knoww
  @Post('refresh')
  async refreshAuthToken(@Body() token: RefreshTokenDto) {
    return await this.appService.refreshToken(token);
  }
}
