import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class CreateAdminDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  readonly confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly organizationId: string;
}

export class CreateOrgRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
