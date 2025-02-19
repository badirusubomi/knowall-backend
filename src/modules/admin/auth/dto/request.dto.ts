import { IsString, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly organizationName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
