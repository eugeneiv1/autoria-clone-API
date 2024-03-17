import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';

import { EUserRole } from '../enums/user-role.enum';

export const UserRoleGuard = (...allowedRoles: EUserRole[]) => {
  return UseGuards(RolesGuard(allowedRoles));
};

const RolesGuard = (roles: EUserRole[]) => {
  class RolesGuardClass implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
      const request = ctx.switchToHttp().getRequest();
      return roles?.some((role) => request.user.roles.includes(role));
    }
  }
  return RolesGuardClass;
};
