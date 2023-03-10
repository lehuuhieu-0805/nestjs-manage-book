import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MessageException } from './../../constants/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './interface/user.repository.interface';
import { IUserService } from './interface/user.service.interface';
import { User } from './user.entity';

// Declare the UserService class as a class that can be managed by the Nest IoC container
// @Injectable() decorator sẽ giúp Nest biết rằng đây là 1 provider
@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(
        MessageException.USER_NOT_EXISTED,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const saltRounds = 10;
      const password = await bcrypt.hash(userDto.password, saltRounds);

      await this.userRepository.updatePassword(id, password);

      return await this.userRepository.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
