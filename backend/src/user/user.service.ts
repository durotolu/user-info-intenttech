import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserContact)
    private userContactRepository: Repository<UserContact>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(UserAcademics)
    private userAcademicsRepository: Repository<UserAcademics>,
    private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.connection.transaction(async (manager) => {
      const userInfo = manager.create(UserInfo, createUserDto.userInfo);
      const savedUserInfo = await manager.save(userInfo);

      const userContact = manager.create(UserContact, {
        ...createUserDto.userContact,
        userInfo: savedUserInfo,
      });
      const userAddress = manager.create(UserAddress, {
        ...createUserDto.userAddress,
        userInfo: savedUserInfo,
      });
      const academics = createUserDto.userAcademics.map((acad) =>
        manager.create(UserAcademics, { ...acad, userInfo: savedUserInfo }),
      );

      const savedUserContact = await manager.save(userContact);
      const savedUserAddress = await manager.save(userAddress);
      const savedUserAcademics = await manager.save(academics);

      return {
        savedUserInfo,
        savedUserAddress,
        savedUserContact,
        savedUserAcademics,
      };
    });
  }

  async findAll() {
    const users = await this.userInfoRepository.find({
      relations: ['userContact', 'userAddress', 'userAcademics'],
    });
    return users.map((user) => ({
      id: user.id,
      userInfo: {
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        occupation: user.occupation,
        gender: user.gender,
      },
      userContact: user.userContact,
      userAddress: user.userAddress,
      userAcademics: user.userAcademics,
    }));
  }

  async findOne(id: string) {
    const user = await this.userInfoRepository.findOne({
      where: { id },
      relations: ['userContact', 'userAddress', 'userAcademics'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      userInfo: {
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        occupation: user.occupation,
        gender: user.gender,
      },
      userContact: user.userContact,
      userAddress: user.userAddress,
      userAcademics: user.userAcademics,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.connection.transaction(async (manager) => {
      await manager.update(UserInfo, id, updateUserDto.userInfo);

      if (updateUserDto.userContact) {
        await manager.update(
          UserContact,
          { userInfo: { id } },
          updateUserDto.userContact,
        );
      }

      if (updateUserDto.userAddress) {
        await manager.update(
          UserAddress,
          { userInfo: { id } },
          updateUserDto.userAddress,
        );
      }

      if (
        updateUserDto.userAcademics &&
        updateUserDto.userAcademics.length > 0
      ) {
        await manager.delete(UserAcademics, { userInfo: { id } });
        const newAcademics = updateUserDto.userAcademics.map((acad) =>
          manager.create(UserAcademics, { ...acad, userInfo: { id } }),
        );
        await manager.save(newAcademics);
      }

      return await this.findOne(id);
    });
  }

  async remove(id: string) {
    await this.userContactRepository.delete({ userInfo: { id } });
    await this.userAddressRepository.delete({ userInfo: { id } });
    await this.userAcademicsRepository.delete({ userInfo: { id } });
    return await this.userInfoRepository.delete(id);
  }
}
