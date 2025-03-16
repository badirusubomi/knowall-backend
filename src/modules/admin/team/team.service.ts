import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgentDto, DeleteAgentDto } from './dto';
import { Admin, Agent, CommonHelpers, Organization } from 'src/lib';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { TeamMemberResponseDto } from './dto/response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RequestContextService } from 'src/services/context/context.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AdminTeamService {
  constructor(
    @InjectRepository(Agent)
    readonly agentRepository: Repository<Agent>,
    @InjectRepository(Organization)
    readonly orgRepository: Repository<Organization>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(RequestContextService) readonly context: RequestContextService,
    readonly helpers: CommonHelpers,
  ) {}

  async getTeamMember(email: string) {
    const admin = this.context.get<Admin>('admin');
    const value = await this.cacheManager.get(`team:${admin.id}:${email}`);

    if (value) {
      return new TeamMemberResponseDto(value);
    }

    const teamOrg = await this.orgRepository.findOne({
      where: { admin: { id: Equal(admin.id) } },
      relations: { agents: true },
    });

    const teamMembers = teamOrg.agents;

    const teamMember = teamMembers.find((member) => member.email === email);

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    let retVal = new TeamMemberResponseDto(teamMember);
    await this.cacheManager.set(`team:${admin.id}:${email}`, retVal);
    return retVal;
  }

  async createAgent(createAgent: CreateAgentDto) {
    // TODO: save admin to createdBy for agent
    const { firstName, lastName, role, password } = createAgent;
    const email = createAgent.email.toLocaleLowerCase();

    const admin = this.context.get<Admin>('admin');

    const organization = await this.orgRepository.findOne({
      where: { admin: { id: Equal(admin.id) } },
    });
    if (!organization) {
      return { status: 404, success: false, message: 'Organization not found' };
    }

    const checkUser = await this.agentRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          id: Equal(organization.id),
        },
      },
    });

    if (checkUser) {
      throw new BadRequestException('Agent already exists with this company');
    }
    try {
      let hashedPassword = await this.helpers.generatePasswordHash(password);
      const agent = await this.agentRepository.save({
        firstName,
        lastName,
        email,
        organization,
        password: hashedPassword,
        role,
      });
      return {
        success: true,
        message: `Agent account- ${email} created successfully`,
      };
    } catch (e) {
      console.log(`Error during agent account creation: ${e}`);
      throw new HttpException('Error during agent account creation', 500);
    }
  }

  async removeAgent(payload: DeleteAgentDto) {
    // TODO: do something with payload.reason
    const { email } = payload;
    try {
      const agent = await this.agentRepository.delete({
        email: email,
      });
      return {
        status: 200,
        success: true,
        message: `Succesfully deleted agent: ${email}`,
      };
    } catch (e) {
      console.log(`Error occured while deleting agent`);
      return { status: 500, success: false, message: 'Server Error' };
    }
  }
}
