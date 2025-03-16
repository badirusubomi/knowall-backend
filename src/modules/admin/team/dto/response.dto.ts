import { Expose } from 'class-transformer';
import { Agent } from 'src/lib';

export class TeamMemberResponseDto {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
