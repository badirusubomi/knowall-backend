import { Entity, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Admin } from './admin.entity';
import { Agent } from './agent.entity';

@Entity({ name: 'organization' })
export class Organization extends IBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Admin, (admin) => admin.organization)
  @JoinColumn()
  admin: Admin;

  @OneToMany(() => Agent, (agent) => agent.organization)
  @JoinColumn()
  agents: Agent[];
}
