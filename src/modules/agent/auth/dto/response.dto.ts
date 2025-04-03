import { Expose } from 'class-transformer';
import { Agent } from 'src/lib';

export class AgentResponseDto {
  constructor(partial: Partial<Agent>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
