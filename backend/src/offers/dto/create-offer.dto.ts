// libraries
import { OmitType } from '@nestjs/mapped-types';

// decorators
import {
  IsOptional,
  IsPositive,
  IsBoolean,
  IsNumber,
  IsInt,
  Max,
} from 'class-validator';

// constants
import {
  MONEY_DECIMAL_MAX_VALUE,
  MONEY_DECIMAL_SCALE,
} from 'src/common/constants';

// types
import { UncleanedEscapableDto } from 'src/common/types';

// content

export class UncleanedCreateOfferDto extends UncleanedEscapableDto {
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsPositive()
  @Max(MONEY_DECIMAL_MAX_VALUE)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_SCALE,
  })
  amount: number;

  @IsInt()
  @IsPositive()
  itemId: number;

  public escapeFields(): CreateOfferDto {
    return this;
  }
}

export class CreateOfferDto extends OmitType(UncleanedCreateOfferDto, [
  'escapeFields',
]) {}
