import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity('messages')
class Message{
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  user_id: string;

  @JoinColumn({name: 'user_id'}) // which column in this entity this object represents
  @ManyToOne(() => User) // several messages per one user
  user: User;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default Message;
