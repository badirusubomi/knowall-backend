import { Expose } from 'class-transformer';
import { Organization } from 'src/lib';

export class CreateOrgResponseDto {
  constructor(partial: Partial<Organization>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
