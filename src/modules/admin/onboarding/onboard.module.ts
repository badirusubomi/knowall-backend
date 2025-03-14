import { Module } from '@nestjs/common';
import { AdminOnboardService } from './onboard.service';
import { AdminOnboardController } from './onboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, CommonHelpers, Organization } from 'src/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Admin])],
  providers: [AdminOnboardService, CommonHelpers],
  controllers: [AdminOnboardController],
})
export class AdminOnboardModule {}
