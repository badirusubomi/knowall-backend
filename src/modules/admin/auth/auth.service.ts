import { Inject, Injectable } from '@nestjs/common';
import { LogInDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Admin, CommonHelpers, LoginActivity } from 'src/lib';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    readonly adminRepository: Repository<Admin>,
    @InjectRepository(LoginActivity)
    readonly loginActivityRepsository: Repository<LoginActivity>,
    @Inject(CACHE_MANAGER) readonly cache: Cache,
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
    if (!match) {
      return { success: false, message: 'Incorrect login Credentials' };
    }

    this.loginActivityRepsository.save({
      device: 'default',
      entityType: 'admin',
      entityId: admin.id,
      ip: '0:0:0:0',
    });

    const accessToken = await this.helpers.generateAccessToken();

    const cacheResponse = await this.cache.set(
      `accessToken:${accessToken}`,
      admin.id,
      60000,
    );
    return {
      success: true,
      message: 'Admin validated',
      accessToken: accessToken,
    };
  }
}
