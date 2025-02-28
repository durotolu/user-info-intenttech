import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity('UserContactTB')
export class UserContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  linkedInUrl?: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  userInfo: UserInfo;
}
