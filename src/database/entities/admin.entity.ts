import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'admin' })
export class Admin extends IBaseEntity {
  @Column({ name: 'first-name' })
  firstName: string;

  @Column({ name: 'last-name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Organization, (organization) => organization.admin)
  @JoinColumn()
  organization: string;
}
