import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Admin, CommonHelpers, LoginActivity } from 'src/lib';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { RequestContextService } from 'src/services/context/context.service';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    readonly adminRepository: Repository<Admin>,
    @InjectRepository(LoginActivity)
    readonly loginActivityRepsository: Repository<LoginActivity>,
    @Inject(CACHE_MANAGER) readonly cache: Cache,
    readonly helpers: CommonHelpers,
    private jwtService: JwtService,
    private requestService: RequestContextService,
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
      throw new UnauthorizedException('Incorrect Login Credentials');
    }

    let match = await this.helpers.comparePasswords(password, admin.password);
    if (!match) {
      throw new UnauthorizedException('Incorrect login credentials');
    }

    this.loginActivityRepsository.save({
      device: 'default',
      entityType: 'admin',
      entityId: admin.id,
      ip: this.requestService.req.ip,
    });

    const accessToken = await this.helpers.generateAccessToken();
    const payload = {
      id: admin.id,
      email: admin.email,
    };

    const jwtAccessToken = this.jwtService.sign(payload);
    const jwtRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '3 days',
    });

    // keep for logout mechanism. Will check if token is still saved in cache before granting access
    const cacheResponse = this.cache.set(
      `accessToken:${jwtAccessToken}`,
      admin.id,
      60000,
    );

    return {
      success: true,
      message: 'Admin validated',
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken,
    };
  }
}
