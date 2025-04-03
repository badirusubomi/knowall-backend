import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent, CommonHelpers, LoginActivity } from 'src/lib';
import { Repository, Equal } from 'typeorm';
import { LogInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { RequestContextService } from 'src/services/context/context.service';
import { AgentResponseDto } from './dto/response.dto';

@Injectable()
export class AgentAuthService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(LoginActivity)
    private readonly loginActivityRepsository: Repository<LoginActivity>,
    private readonly helpers: CommonHelpers,
    private jwtService: JwtService,
    private requestService: RequestContextService,
  ) {}

  async getLoggedInAgent() {
    const agent = this.requestService.currentAgent;
    if (!agent) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { success: true, data: new AgentResponseDto(agent) };
  }

  async login(logInDto: LogInDto) {
    const { email, password, organizationName } = logInDto;

    const agent = await this.agentRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          name: Equal(organizationName),
        },
      },
    });

    if (!agent?.id) {
      throw new UnauthorizedException('Incorrect Login Credentials');
    }

    let match = await this.helpers.comparePasswords(password, agent.password);

    if (!match) {
      throw new UnauthorizedException('Incorrect login credentials');
    }

    this.loginActivityRepsository.save({
      device: 'default',
      entityType: 'agent',
      entityId: agent.id,
      ip: '0:0:0:0',
    });

    const payload = {
      adminId: agent.id,
      email: agent.email,
    };

    const jwtAccessToken = await this.jwtService.sign(payload);

    await this.requestService.set<Agent>('agent', agent);

    return {
      success: true,
      message: 'Agent validated',
      accessToken: jwtAccessToken,
    };
  }
}
