import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity('UserAcamesicsTB')
export class UserAcademics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schoolName: string;

  @ManyToOne(() => UserInfo, (user) => user.id)
  userInfo: UserInfo;
}
