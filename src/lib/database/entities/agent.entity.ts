import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { ChatSession } from './chat-session.entity';
import { Admin } from './admin.entity';

@Entity({ name: 'agent' })
export class Agent extends IBaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'first-name', nullable: false })
  firstName: string;

  @Column({ name: 'last-name', nullable: false })
  lastName: string;

  @Column()
  role: string;

  @OneToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'created-by', referencedColumnName: 'id' })
  createdBy: Admin;

  @ManyToOne(() => Organization, (org) => org.agents, { nullable: false })
  @JoinColumn({ name: 'organization' })
  organization: Organization;

  @OneToMany(() => ChatSession, (session) => session.agent)
  @JoinColumn({ name: 'organization' })
  chatSessions: ChatSession[];
}
