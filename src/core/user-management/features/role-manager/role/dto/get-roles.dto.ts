import { IsEnum, IsOptional } from 'class-validator';
import { CustomReqQueryDTO } from 'src/shared/modules/repository/types/custom-req-query.types';
import { STATUS, USER_TYPE } from 'src/shared/types/enums';

export class GetAllRolesDTO extends CustomReqQueryDTO {
  @IsOptional()
  id: string | object;

  @IsOptional()
  @IsEnum(USER_TYPE)
  type: USER_TYPE;

  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;
}
