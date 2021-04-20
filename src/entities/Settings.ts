import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
/**
 * Maps tp the SQLite Settings table
 */

@Entity('settings')
class Settings {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    // if id is not defined (e.g. when updating), generate a uuid
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default Settings;
