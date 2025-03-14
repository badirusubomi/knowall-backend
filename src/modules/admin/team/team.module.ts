import { Module } from '@nestjs/common';
import { AdminTeamService } from './team.service';
import { AdminTeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent, CommonHelpers, Organization } from 'src/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Organization])],
  providers: [AdminTeamService, CommonHelpers],
  controllers: [AdminTeamController],
})
export class AdminTeamModule {}
