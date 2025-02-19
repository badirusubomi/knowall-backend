import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent, LoginActivity, Organization } from 'src/lib';
import { Repository, Equal } from 'typeorm';
import { LogInDto } from './dto';

@Injectable()
export class AgentAuthService {
  constructor(
    @InjectRepository(Agent)
    readonly agentRepository: Repository<Agent>,
    @InjectRepository(Organization)
    readonly orgRepository: Repository<Organization>,
    @InjectRepository(LoginActivity)
    readonly loginActivityRepsository: Repository<LoginActivity>,
  ) {}

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
      return {
        status: 401,
        success: false,
        message: 'Incorrect login Credentials',
      };
    }

    // compare hash not plain text : bcrypt. Implement common helper method for it
    if (password === agent.password) {
      this.loginActivityRepsository.save({
        device: 'default',
        entityType: 'admin',
        ip: '0:0:0:0',
      });
      return {
        success: true,
        message: 'Agent succesfully validated',
        accessToken: 'youMayPass',
      };
    }
    return { success: false, message: 'Incorrect login Credentials' };
  }
}
