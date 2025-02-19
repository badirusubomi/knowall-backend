import { Column, Entity } from 'typeorm';
import { IBaseEntity } from './base.entity';

@Entity({ name: 'login-activity' })
export class LoginActivity extends IBaseEntity {
  @Column({ name: 'device', nullable: true })
  device: string;

  // admin | agent
  @Column({ name: 'entity-type', nullable: false })
  entityType: string;

  @Column({ name: 'entity-id', nullable: false })
  entityId: string;

  @Column({ name: 'ip-address', nullable: true })
  ip: string;

  @Column({ name: 'meta', nullable: true })
  meta: string;
}
