import { SetMetadata } from '@nestjs/common';

export const ActionName = (action: string | string[]) =>
  SetMetadata('actionName', action);
