import { Module } from '@nestjs/common';
import { AdminTeamService } from './team.service';
import { AdminTeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent, Organization } from 'src/lib';
import { Admin } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Organization])],
  providers: [AdminTeamService],
  controllers: [AdminTeamController],
})
export class AdminTeamModule {}
