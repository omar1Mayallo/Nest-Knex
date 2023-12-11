import { Controller, Get, Body, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';

@Controller('users')
export class UsersController {
  constructor(private readonly i18n: I18nCustomService) {}
  @Get()
  getHello(@Body() CreateUserDto: CreateUserDto): string {
    console.log(CreateUserDto);

    if (CreateUserDto) {
      throw new NotFoundException(this.i18n.t('test.name_must_be_string'));
    }
    return 'Hello World';
  }
}
