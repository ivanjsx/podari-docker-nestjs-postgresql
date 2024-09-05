// libraries
import escape from 'escape-html';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// utils
import { CreateWishlistDto } from './create-wishlist.dto';

// content

export class UncleanedUpdateWishlistDto extends PartialType(CreateWishlistDto) {
  public escapeFields(): UpdateWishlistDto {
    const result: UpdateWishlistDto = {};
    if (this.name) result.name = escape(this.name);
    if (this.image) result.image = escape(this.image);
    if (this.description) result.description = escape(this.description);
    if (this.itemsId) result.itemsId = this.itemsId;
    return result;
  }
}

export class UpdateWishlistDto extends OmitType(UncleanedUpdateWishlistDto, [
  'escapeFields',
]) {}
