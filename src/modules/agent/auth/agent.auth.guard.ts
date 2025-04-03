import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent, GlobalConfig } from 'src/lib';
import { RequestContextService } from 'src/services/context/context.service';
import { Repository, Equal } from 'typeorm';

@Injectable()
export class AgentGuard implements CanActivate {
  constructor(
    private requestContextService: RequestContextService,
    @InjectRepository(Agent) readonly agentRepository: Repository<Agent>,
    private jwtService: JwtService,
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
    // const agentId = await this.cache.get<string>(`accessToken:${accessToken}`);

    const token = this.extractTokenFromHeader(accessToken);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: GlobalConfig().jwt.secret,
      });

      // assign authenticated admin to current session
      const agent = await this.agentRepository.findOne({
        where: { id: Equal(payload.adminId) },
      });

      this.requestContextService.set<Agent>('agent', agent);
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
