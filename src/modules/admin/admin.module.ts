import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth';
import { AdminOnboardModule } from './onboarding/onboard.module';
import { AdminTeamModule } from './team';

@Module({ imports: [AdminAuthModule, AdminOnboardModule, AdminTeamModule] })
export class AdminModule {}
