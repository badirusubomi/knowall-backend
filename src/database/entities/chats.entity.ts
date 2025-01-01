import { Column, Entity } from 'typeorm';
import { IBaseEntity } from './base.entity';

@Entity({ name: 'chats' })
export class Chats extends IBaseEntity {
  @Column()
  timestamp: Date;

  @Column()
  meta: string;
}
