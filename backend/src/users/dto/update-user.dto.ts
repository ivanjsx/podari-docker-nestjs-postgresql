// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateUserDto } from './create-user.dto';

// content

export class UncleanedUpdateUserDto extends PartialType(CreateUserDto) {
  public escapeFields(): UpdateUserDto {
    const result: UpdateUserDto = {};
    if (this.email) result.email = escape(this.email);
    if (this.username) result.username = escape(this.username);
    if (this.password) result.password = escape(this.password);
    if (this.about) result.about = escape(this.about);
    if (this.avatar) result.avatar = escape(this.avatar);
    return result;
  }
}

export class UpdateUserDto extends OmitType(UncleanedUpdateUserDto, [
  'escapeFields',
]) {}
