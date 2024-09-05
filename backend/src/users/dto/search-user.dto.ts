// libraries
import escape from 'escape-html';
import { OmitType } from '@nestjs/mapped-types';

// decorators
import { IsNotEmpty, IsString } from 'class-validator';

// utils
import { UncleanedEscapableDto } from 'src/common/types';

// content

export class UncleanedSearchUserDto extends UncleanedEscapableDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  public escapeFields(): SearchUserDto {
    const result: SearchUserDto = {
      query: escape(this.query),
    };
    return result;
  }
}

export class SearchUserDto extends OmitType(UncleanedSearchUserDto, [
  'escapeFields',
]) {}
