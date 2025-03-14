import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Agent } from './agent.entity';

@Entity({ name: 'chat-session' })
export class ChatSession extends IBaseEntity {
  @Column({ name: 'title', nullable: true })
  name: string;

  @Column({ name: 'meta', nullable: true })
  meta: string;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agent', referencedColumnName: 'id' })
  agent: Agent;
}
