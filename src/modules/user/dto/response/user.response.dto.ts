import { MessageEntity } from '../../../../database/entities/message.entity';

export class UserResponseDto {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  sent: MessageEntity[];
  inbox: MessageEntity[];
}
