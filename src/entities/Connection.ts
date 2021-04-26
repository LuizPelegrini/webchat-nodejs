import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity('connections')
class Connection{
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: User;

  @Column()
  socket_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default Connection;
