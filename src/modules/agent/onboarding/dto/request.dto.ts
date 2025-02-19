import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
