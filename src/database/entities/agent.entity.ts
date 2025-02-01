import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'agent' })
export class Agent extends IBaseEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'first-name', nullable: false })
  firstName: string;

  @Column({ name: 'last-name', nullable: false })
  lastName: string;

  @Column()
  role: string;

  @ManyToOne(() => Organization, (org) => org.agents, { nullable: false })
  @JoinColumn()
  organization: Organization;
}
