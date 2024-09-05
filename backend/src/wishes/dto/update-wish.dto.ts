// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateWishDto } from './create-wish.dto';

// content

export class UncleanedUpdateWishDto extends PartialType(CreateWishDto) {
  public escapeFields(): UpdateWishDto {
    const result: UpdateWishDto = {};
    if (this.name) result.name = escape(this.name);
    if (this.link) result.link = escape(this.link);
    if (this.image) result.image = escape(this.image);
    if (this.description) result.description = escape(this.description);
    if (this.price) result.price = this.price;
    return result;
  }
}

export class UpdateWishDto extends OmitType(UncleanedUpdateWishDto, [
  'escapeFields',
]) {}
