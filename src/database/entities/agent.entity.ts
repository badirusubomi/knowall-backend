import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'agent' })
export class Agent extends IBaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first-name' })
  firstName: string;

  @Column({ name: 'last-name' })
  lastName: string;

  @Column()
  role: string;

  @ManyToOne(() => Organization, (org) => org.agents)
  @JoinColumn()
  organization: Organization;
}
