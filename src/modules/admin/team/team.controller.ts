import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminTeamService } from './team.service';
import { CreateAgentDto, DeleteAgentDto } from './dto';
import { AdminGuard } from '../admin.guard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Agent } from 'src/lib';

@Controller('admin/team')
@CacheKey('accessToken')
@SerializeOptions({ strategy: 'exposeAll' })
@UseGuards(AdminGuard)
export class AdminTeamController {
  constructor(private adminTeamService: AdminTeamService) {}

  @CacheKey('team')
  @CacheTTL(6000)
  @Get(':email')
  async getTeam(@Param('email') email: string) {
    return this.adminTeamService.getTeamMember(email);
  }

  @Post('add')
  async createAgent(@Body() payload: CreateAgentDto) {
    return this.adminTeamService.createAgent(payload);
  }

  @Delete()
  async deleteAgent(@Body() payload: DeleteAgentDto) {
    return this.adminTeamService.removeAgent(payload);
  }
}
