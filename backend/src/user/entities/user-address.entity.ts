import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity('UserAddressTB')
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  userInfo: UserInfo;
}
