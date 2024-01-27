import { SetMetadata } from '@nestjs/common';

export const IsAuthenticationGuard = (isAuthenticationOnly: boolean = true) =>
  SetMetadata('isAuthenticationOnly', isAuthenticationOnly);
