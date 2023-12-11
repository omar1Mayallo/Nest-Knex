import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomLocalizedField {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.toString().trim();
  })
  ar: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.toString().trim();
  })
  en: string;
}
