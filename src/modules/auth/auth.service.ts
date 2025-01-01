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
    const { email, password, organization: organizationName } = logInDto;
    const org = await this.orgRepository.findOne({
      where: { name: organizationName },
    });
    if (!org?.id) {
      return {
        status: 404,
        success: false,
        message: 'Organization not registered',
      };
    }
    const user = await this.agentRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          id: Equal(org.id),
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
      return { success: true, message: 'User validated' };
    }
    return { success: false, message: 'Incorrect login Credentials' };
  }

  async createAdmin(createAdminDto: CreateAdminDTO) {
    const { password, firstName, lastName, role } = createAdminDto;
    const email = createAdminDto.email.toLocaleLowerCase();
    const organizationEmail =
      createAdminDto.organizationEmail.toLocaleLowerCase();
    const organizationName =
      createAdminDto.organizationName.toLocaleLowerCase();

    const newOrganization = this.orgRepository.create();
    const newAdmin = this.adminRepository.create();
    newAdmin.email = email;
    newAdmin.firstName = firstName;
    newAdmin.lastName = lastName;
    newAdmin.password = password;

    const admin = await this.adminRepository.save(newAdmin);

    newOrganization.email = organizationEmail;
    newOrganization.name = organizationName;
    newOrganization.admin = newAdmin;

    const org = await this.orgRepository.save(newOrganization);
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

    const org = await this.orgRepository.findOne({
      where: { name: organizationName },
    });

    const checkUser = await this.agentRepository.findOne({
      where: {
        email: Equal(email),
        organization: {
          id: Equal(org.id),
        },
      },
    });

    if (checkUser) {
      return {
        status: 401,
        success: false,
        message: 'User already exists with another company',
      };
    }
    const newAgent = await this.agentRepository.create();
    newAgent.firstName = firstName;
    newAgent.lastName = lastName;
    newAgent.email = email;
    if (organizationName) {
      const org = await this.orgRepository.findOne({
        where: {
          name: Equal(organizationName),
        },
      });
      newAgent.organization = org;
    }
    if (role) {
      newAgent.role = role;
    }
    newAgent.password = password;

    await this.agentRepository.save(newAgent);

    return { success: true, message: `Agent - ${email} saved successfully` };
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
