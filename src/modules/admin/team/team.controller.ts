import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AdminTeamService } from './team.service';
import { CreateAgentDto, DeleteAgentDto } from './dto';
import { AdminGuard } from '../admin.guard';

@Controller('admin/team')
@UseGuards(AdminGuard)
export class AdminTeamController {
  constructor(private adminTeamService: AdminTeamService) {}

  @Post('add')
  async createAgent(@Body() payload: CreateAgentDto) {
    return this.adminTeamService.createAgent(payload);
  }

  @Delete()
  async deleteAgent(@Body() payload: DeleteAgentDto) {
    return this.adminTeamService.removeAgent(payload);
  }
}
