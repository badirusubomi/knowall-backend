import { Module } from '@nestjs/common';
import { AgentProfileService } from './profile.service';
import { AgentProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/lib';

@Module({
  imports: [TypeOrmModule.forFeature([Agent])],
  providers: [AgentProfileService],
  controllers: [AgentProfileController],
})
export class AgentProfileModule {}
