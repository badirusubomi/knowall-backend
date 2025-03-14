import { Injectable } from '@nestjs/common';
import { LogInDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Admin, CommonHelpers, LoginActivity } from 'src/lib';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    readonly adminRepository: Repository<Admin>,
    @InjectRepository(LoginActivity)
    readonly loginActivityRepsository: Repository<LoginActivity>,
    readonly helpers: CommonHelpers,
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

    let match = await this.helpers.comparePasswords(password, admin.password);
    if (match) {
      this.loginActivityRepsository.save({
        device: 'default',
        entityType: 'admin',
        entityId: admin.id,
        ip: '0:0:0:0',
      });
      return {
        success: true,
        message: 'Admin validated',
        accessToken: 'AdminYouMayPass',
      };
    }
    return { success: false, message: 'Incorrect login Credentials' };
  }
}
