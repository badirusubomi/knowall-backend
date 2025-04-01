import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Admin, GlobalConfig } from 'src/lib';
import { RequestContextService } from 'src/services/context/context.service';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private requestContextService: RequestContextService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectRepository(Admin) readonly adminRepository: Repository<Admin>,
    @Inject() private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken: string = request.headers['x-access-token'];

    if (!accessToken) {
      throw new UnauthorizedException('No access token attched');
    }

    this.requestContextService.set<string>('accessToken', accessToken);

    // authentication logic here
    const isAuthenticated = await this.authenticate(accessToken);

    if (!isAuthenticated) {
      throw new UnauthorizedException('Login token expired');
    }

    return isAuthenticated;
  }

  private async authenticate(accessToken: string) {
    // const adminId = await this.cache.get<string>(`accessToken:${accessToken}`);

    const token = this.extractTokenFromHeader(accessToken);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: GlobalConfig().jwt.secret,
      });

      // assign authenticated admin to current session
      const admin = await this.adminRepository.findOne({
        where: { id: Equal(payload.adminId) },
      });

      this.requestContextService.set<Admin>('admin', admin);
    } catch {
      return false;
    }
    return true;
  }

  private splitBearer(token: string) {
    return token.split(' ');
  }

  private extractTokenFromHeader(accessToken: string): string | undefined {
    const [type, token] = this.splitBearer(accessToken) ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
