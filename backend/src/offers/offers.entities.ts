// decorators
import { ManyToOne, Column, Entity, Check } from 'typeorm';
import { IsBoolean, IsNumber, IsPositive, Max } from 'class-validator';

// entities
import { User } from 'src/users/users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// utils
import { WithIdAndDates } from 'src/common/entities';
import { moneyTransformer } from 'src/common/transformers';

// constants
import {
  MONEY_DECIMAL_MIN_POSITIVE_VALUE,
  MONEY_DECIMAL_MAX_VALUE,
  MONEY_DECIMAL_PRECISION,
  MONEY_DECIMAL_SCALE,
} from 'src/common/constants';

// content

@Entity()
@Check(`"amount" <= ${MONEY_DECIMAL_MAX_VALUE}`)
@Check(`"amount" >= ${MONEY_DECIMAL_MIN_POSITIVE_VALUE}`)
export class Offer extends WithIdAndDates {
  @IsBoolean()
  @Column({
    default: false,
  })
  hidden: boolean;

  @IsPositive()
  @Max(MONEY_DECIMAL_MAX_VALUE)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_SCALE,
  })
  @Column({
    type: 'numeric',
    scale: MONEY_DECIMAL_SCALE,
    precision: MONEY_DECIMAL_PRECISION,
    transformer: moneyTransformer,
  })
  amount: number;

  @ManyToOne(() => Wish, (wish) => wish.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  item: Wish;

  @ManyToOne(() => User, (user) => user.offers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  proposer: User;
}
