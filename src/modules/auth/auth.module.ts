import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Admin, Agent, Organization } from 'src/database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Organization, Admin])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
