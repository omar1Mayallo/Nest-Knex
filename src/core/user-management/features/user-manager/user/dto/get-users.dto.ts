import { IsOptional } from 'class-validator';
import { CustomReqQueryDTO } from 'src/shared/modules/repository/types/custom-req-query.types';

export class GetAllUsersDTO extends CustomReqQueryDTO {
  @IsOptional()
  id: string | object;

  @IsOptional()
  deleted_at: string | object;
}
