import {SetMetadata} from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}