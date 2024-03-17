import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { forbiddenWords } from '../constants/forbidden-words.constant';

@Injectable()
export class ForbiddenWordsGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    const { message } = request.body;

    return !forbiddenWords.some((word) => message.toLowerCase().includes(word));
  }
}
