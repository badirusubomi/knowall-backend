import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './request.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
