import { Entity, Column } from 'typeorm';
import { IBaseEntity } from './base.entity';

@Entity({ name: 'permissions' })
export class Permissions extends IBaseEntity {
  @Column()
  permission: string;

  @Column()
  slug: string;
}
