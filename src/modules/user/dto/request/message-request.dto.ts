import { IsString } from 'class-validator';

export class MessageRequestDto {
  @IsString()
  recipientId: string;

  @IsString()
  body: string;
}
