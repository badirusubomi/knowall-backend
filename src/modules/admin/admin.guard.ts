import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Admin } from 'src/lib';
import { RequestContextService } from 'src/services/context/context.service';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private requestContextService: RequestContextService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectRepository(Admin) readonly adminRepository: Repository<Admin>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken: string = request.headers['x-access-token'];
    this.requestContextService.set<string>('accessToken', accessToken);

    // authentication logic here
    const isAuthenticated = await this.authenticate(accessToken);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Login token expired');
    }

    const adminId = await this.cache.get<string>(`accessToken:${accessToken}`);
    const admin = await this.adminRepository.findOne({
      where: { id: Equal(adminId) },
    });

    this.requestContextService.set<Admin>('admin', admin);
    return isAuthenticated;
  }

  private async authenticate(accessToken: string) {
    const adminId = await this.cache.get<string>(`accessToken:${accessToken}`);

    if (adminId) {
      return true;
    }
    return false;
  }
}
