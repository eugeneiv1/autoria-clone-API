import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MessageRepository } from '../../repository/services/message.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { MessageRequestDto } from '../dto/request/message-request.dto';
import { RoleListRequestDto } from '../dto/request/role-list.request.dto';
import { UserListRequestDto } from '../dto/request/user-list.request.dto';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserListResponseDto } from '../dto/response/user-list.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  public async getAll(query: UserListRequestDto): Promise<UserListResponseDto> {
    const [users, total] = await this.userRepository.getUsersList(query);

    return UserMapper.userListToResponse(users, total, query);
  }

  public async getOneUser(userId: string): Promise<UserResponseDto> {
    const user = await this.isUserExist(userId);

    return UserMapper.userToResponse(user);
  }

  public async sendMessage(dto: MessageRequestDto, userData?: IUserData) {
    const isId = userData ? userData.userId : null;
    await this.isUserExist(dto.recipientId);

    await this.messageRepository.save(
      this.messageRepository.create({
        body: dto.body,
        author_Id: isId,
        recipient_Id: dto.recipientId,
      }),
    );
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await this.isUserExist(userId);

    await this.userRepository.delete({ id: user.id });
  }

  public async addRole(
    userId: string,
    query: RoleListRequestDto,
  ): Promise<UserResponseDto> {
    const queryRoles = !Array.isArray(query.roles)
      ? [query.roles]
      : query.roles;
    const user = await this.isUserExist(userId);
    const newRoles = queryRoles.filter((role) => !user.roles.includes(role));
    user.roles = [...user.roles, ...newRoles];
    await this.userRepository.save(user);

    return UserMapper.userToResponse(user);
  }

  public async removeRole(
    userId: string,
    query: RoleListRequestDto,
  ): Promise<UserResponseDto> {
    const queryRoles = !Array.isArray(query.roles)
      ? [query.roles]
      : query.roles;
    const user = await this.isUserExist(userId);
    user.roles = user.roles.filter((role) => !queryRoles.includes(role));
    await this.userRepository.save(user);

    return UserMapper.userToResponse(user);
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }

  public async isUserExist(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
