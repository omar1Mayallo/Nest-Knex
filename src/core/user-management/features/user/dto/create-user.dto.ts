import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PASSWORD_REGEX, USERNAME_REGEX } from 'src/shared/constants/regexs';

export class CreateUserDTO {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Matches(PASSWORD_REGEX, {
    message: i18nValidationMessage('validation.PASSWORD_REGEX'),
  })
  password: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Matches(USERNAME_REGEX, {
    message: i18nValidationMessage('validation.USERNAME_REGEX'),
  })
  username: string;
}
