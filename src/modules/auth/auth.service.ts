import { Injectable } from '@nestjs/common';
import { CreateAgentDTO, UpdateAuthDto, LogInDto, CreateAdminDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Agent, Organization, Admin } from 'src/database';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Agent)
    readonly agentRepository: Repository<Agent>,
    @InjectRepository(Organization)
    readonly orgRepository: Repository<Organization>,
    @InjectRepository(Admin)
    readonly adminRepository: Repository<Admin>,
  ) {}

  async logIn(logInDto: LogInDto) {
    const { email, password, organizationName } = logInDto;

    const user = await this.agentRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          name: Equal(organizationName),
        },
      },
    });

    if (!user?.id) {
      return {
        status: 401,
        success: false,
        message: 'Incorrect login Credentials',
      };
    }

    if (password === user.password) {
      return {
        success: true,
        message: 'User validated',
        accessToken: 'youMayPass',
      };
    }
    return { success: false, message: 'Incorrect login Credentials' };
  }

  async createAdmin(createAdminDto: CreateAdminDTO) {
    const { password, firstName, lastName } = createAdminDto;

    const email = createAdminDto.email.toLocaleLowerCase();

    const newOrganization = this.orgRepository.create();
    newOrganization.email =
      createAdminDto.organizationEmail.toLocaleLowerCase();
    newOrganization.name = createAdminDto.organizationName.toLocaleLowerCase();

    const organization = await this.orgRepository.save(newOrganization);

    try {
      await this.orgRepository.save({});

      const admin = await this.adminRepository.save({
        firstName,
        lastName,
        email,
        organization,
        password,
      });
      await this.orgRepository.save({ admin });
      return {
        success: true,
        message: `Admin account- ${email} created successfully`,
      };
    } catch (e) {
      console.log(`Error during admin account creation: ${e}`);
      return {
        success: false,
        message: `Error during admin account creation`,
        meta: e,
      };
    }
  }

  async createAgent(createAgent: CreateAgentDTO) {
    const {
      firstName,
      lastName,
      organization: organizationName,
      role,
      password,
    } = createAgent;
    const email = createAgent.email.toLocaleLowerCase();

    const organization = await this.orgRepository.findOne({
      where: { name: Equal(organizationName) },
    });

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
      await this.agentRepository.save({
        firstName,
        lastName,
        email,
        organization,
        password,
        ...(role && { role }),
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

  updateAgent(email: string, updateAgentDto: UpdateAuthDto) {
    return `This action updates agent: ${email} auth`;
  }

  async removeAgent(email: string) {
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
