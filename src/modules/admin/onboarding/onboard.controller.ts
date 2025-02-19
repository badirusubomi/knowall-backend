import { Body, Controller, Post } from '@nestjs/common';
import { AdminOnboardService } from './onboard.service';
import { CreateAdminDTO, CreateOrgRequestDto } from './dto';

@Controller('admin/onboard')
export class AdminOnboardController {
  constructor(private adminOnboardService: AdminOnboardService) {}
  @Post('signup')
  async signup(@Body() payload: CreateAdminDTO) {
    return this.adminOnboardService.signup(payload);
  }

  @Post('signup/organization')
  async createOrganization(@Body() payload: CreateOrgRequestDto) {
    return this, this.adminOnboardService.createOrg(payload);
  }
}
