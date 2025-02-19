import { Column, Entity } from 'typeorm';
import { IBaseEntity } from './base.entity';

// Not for use. Chat entity should be in a no-sql DB.
// To be used in websocket server
@Entity({ name: 'chats' })
export class Chats extends IBaseEntity {
  @Column()
  timestamp: Date;

  @Column()
  meta: string;
}
