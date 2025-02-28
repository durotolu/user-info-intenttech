import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { UserAcademics } from './user-academics.entity';

@Entity('UserInfoTB')
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('date')
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @OneToOne(() => UserContact, (userContact) => userContact.userInfo, {
    cascade: true,
  })
  userContact: UserContact;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.userInfo, {
    cascade: true,
  })
  userAddress: UserAddress;

  @OneToMany(() => UserAcademics, (UserAcademics) => UserAcademics.userInfo, {
    cascade: true,
  })
  userAcademics: UserAcademics;
}
