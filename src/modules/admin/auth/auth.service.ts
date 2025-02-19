import { Injectable } from '@nestjs/common';
import { LogInDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Admin, LoginActivity } from 'src/lib';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    readonly adminRepository: Repository<Admin>,
    @InjectRepository(LoginActivity)
    readonly loginActivityRepsository: Repository<LoginActivity>,
  ) {}

  async login(logInDto: LogInDto) {
    const { email, password, organizationName } = logInDto;

    const admin = await this.adminRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          name: Equal(organizationName),
        },
      },
    });

    if (!admin?.id) {
      return {
        status: 401,
        success: false,
        message: 'Incorrect login Credentials',
      };
    }

    if (password === admin.password) {
      this.loginActivityRepsository.save({
        device: 'default',
        entityType: 'admin',
        ip: '0:0:0:0',
      });
      return {
        success: true,
        message: 'Admin validated',
        accessToken: 'youMayPass',
      };
    }
    return { success: false, message: 'Incorrect login Credentials' };
  }
}
