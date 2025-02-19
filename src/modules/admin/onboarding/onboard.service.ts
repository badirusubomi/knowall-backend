import { Injectable } from '@nestjs/common';
import {
  CreateAdminDTO,
  CreateOrgRequestDto,
  CreateOrgResponseDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Organization } from 'src/lib';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AdminOnboardService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async signup(createAdminDto: CreateAdminDTO) {
    const { password, firstName, lastName, organizationId } = createAdminDto;

    const email = createAdminDto.email.toLocaleLowerCase();

    const organization = await this.orgRepository.findOne({
      where: { id: Equal(organizationId) },
    });

    if (!organization) {
      return { status: 404, message: 'Organizaiton does not exist' };
    }

    const admin = await this.adminRepository.save({
      firstName,
      lastName,
      email,
      organization,
      password,
    });

    await this.orgRepository.save({ id: organization.id, admin });
    return {
      status: 'success',
      message: `Admin account- ${email} created successfully`,
    };
  }

  async createOrg(payload: CreateOrgRequestDto) {
    const { name, email } = payload;

    const org = await this.orgRepository.findOne({
      where: [{ name: Equal(name) }, { email: Equal(email) }],
    });

    if (org) {
      return {
        status: 400,
        message: `Organization with email: ${email} already exists`,
      };
    }

    const newOrg = await this.orgRepository.save({ name, email });

    return {
      status: '200',
      data: new CreateOrgResponseDto(newOrg),
      message: 'Organization succesfully created',
    };
  }
}
