import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserContact,
      UserAddress,
      UserAcademics,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
