import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IBaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'admin' })
export class Admin extends IBaseEntity {
  @Column({ name: 'first-name', nullable: false })
  firstName: string;

  @Column({ name: 'last-name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Organization, (organization) => organization.admin, {
    nullable: false,
  })
  @JoinColumn()
  organization: Organization;
}
