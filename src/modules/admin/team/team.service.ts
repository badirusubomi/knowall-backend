import { Injectable } from '@nestjs/common';
import { CreateAgentDto, DeleteAgentDto } from './dto';
import { Agent, Organization } from 'src/lib';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AdminTeamService {
  constructor(
    @InjectRepository(Agent)
    readonly agentRepository: Repository<Agent>,
    @InjectRepository(Organization)
    readonly orgRepository: Repository<Organization>,
  ) {}

  async createAgent(createAgent: CreateAgentDto) {
    // TODO: save admin to createdBy for agent
    const {
      firstName,
      lastName,
      organizationId: organizationId,
      role,
      password,
    } = createAgent;
    const email = createAgent.email.toLocaleLowerCase();

    const organization = await this.orgRepository.findOne({
      where: { id: Equal(organizationId) },
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
      return {
        status: 400,
        success: false,
        message: 'Agent already exists with this company',
      };
    }
    try {
      const agent = await this.agentRepository.save({
        firstName,
        lastName,
        email,
        organization,
        password,
        role,
      });
      return {
        success: true,
        message: `Agent account- ${email} created successfully`,
      };
    } catch (e) {
      console.log(`Error during agent account creation: ${e}`);
      return {
        success: false,
        message: `Error during agent account creation`,
        meta: e,
      };
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
