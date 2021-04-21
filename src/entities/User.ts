import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
class User{
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    // generate the user id when creating a new user
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default User;

