import { Module } from '@nestjs/common';
import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';
import { Admin, Agent, LoginActivity, Organization } from 'src/lib';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, Organization, Admin, LoginActivity]),
  ],
  providers: [AdminAuthService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
