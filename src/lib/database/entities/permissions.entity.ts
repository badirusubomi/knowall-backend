import { Entity, Column } from 'typeorm';
import { IBaseEntity } from './base.entity';

@Entity({ name: 'permissions' })
export class Permissions extends IBaseEntity {
  @Column({ name: 'permission', nullable: false })
  permission: string;

  @Column({ name: 'slug', nullable: false })
  slug: string;

  @Column({ name: 'description' })
  description: string;
}
