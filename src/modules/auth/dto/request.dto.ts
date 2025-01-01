import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {}

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly organization: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateAdminDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly organizationName: string;

  @IsString()
  @IsNotEmpty()
  readonly organizationEmail: string;
}

export class CreateAgentDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly organization: string;
}
