// libraries
import escape from 'escape-html';
import { OmitType } from '@nestjs/mapped-types';

// decorators
import { IsPositive, IsNumber, Length, IsUrl, Max } from 'class-validator';

// constants
import {
  MONEY_DECIMAL_MAX_VALUE,
  MONEY_DECIMAL_SCALE,
} from 'src/common/constants';
import {
  MIN_WISH_DESCRIPTION_LENGTH,
  MAX_WISH_DESCRIPTION_LENGTH,
  MIN_WISH_NAME_LENGTH,
  MAX_WISH_NAME_LENGTH,
} from '../wishes.constants';

// types
import { UncleanedEscapableDto } from 'src/common/types';

// content

export class UncleanedCreateWishDto extends UncleanedEscapableDto {
  @Length(MIN_WISH_NAME_LENGTH, MAX_WISH_NAME_LENGTH)
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  link: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  image: string;

  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  description: string;

  @IsPositive()
  @Max(MONEY_DECIMAL_MAX_VALUE)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_SCALE,
  })
  price: number;

  public escapeFields(): CreateWishDto {
    const result: CreateWishDto = {
      name: escape(this.name),
      link: escape(this.link),
      image: escape(this.image),
      description: escape(this.description),
      price: this.price,
    };
    return result;
  }
}

export class CreateWishDto extends OmitType(UncleanedCreateWishDto, [
  'escapeFields',
]) {}
