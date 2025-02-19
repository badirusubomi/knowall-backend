import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateAgentDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  readonly lastName: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly confirmPassword: string;

  @IsString()
  @IsOptional()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly organizationId: string;
}

export class DeleteAgentDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly reason: string;
}
