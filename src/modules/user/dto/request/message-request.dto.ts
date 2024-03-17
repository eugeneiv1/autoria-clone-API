import { IsString } from 'class-validator';

export class MessageRequestDto {
  @IsString()
  recipientId: string;

  @IsString()
  message: string;
}
