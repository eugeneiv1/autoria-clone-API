import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ForbiddenWordsGuard } from '../../common/guards/forbidden-words.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { MessageRequestDto } from './dto/request/message-request.dto';
import { RoleListRequestDto } from './dto/request/role-list.request.dto';
import { UserListRequestDto } from './dto/request/user-list.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserListResponseDto } from './dto/response/user-list.response.dto';
import { EUserRole } from './enums/user-role.enum';
import { UserRoleGuard } from './guards/user-role.guard';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @Get()
  public async getAll(
    @Query() query: UserListRequestDto,
  ): Promise<UserListResponseDto> {
    return await this.userService.getAll(query);
  }

  @SkipAuth()
  @Get(':userId')
  public async getOneUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getOneUser(userId);
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN, EUserRole.MODERATOR)
  @Delete(':userId')
  public async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.userService.deleteUser(userId);
  }
  @SkipAuth()
  @UseGuards(ForbiddenWordsGuard)
  @Post(':userId/send-message')
  public async sendMessage(
    @Body() dto: MessageRequestDto,
    @CurrentUser() userData?: IUserData,
  ): Promise<void> {
    return await this.userService.sendMessage(dto, userData);
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN)
  @Post('/add-role/:userId')
  public async addRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() query: RoleListRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.addRole(userId, query);
  }

  @ApiBearerAuth()
  @UserRoleGuard(EUserRole.ADMIN)
  @Post('/remove-role/:userId')
  public async removeRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() query: RoleListRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.removeRole(userId, query);
  }
}
