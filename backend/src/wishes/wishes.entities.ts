// decorators
import {
  ManyToMany,
  ManyToOne,
  OneToMany,
  Entity,
  Column,
  Check,
} from 'typeorm';
import {
  IsPositive,
  IsNumber,
  Length,
  IsUrl,
  IsInt,
  Min,
  Max,
} from 'class-validator';

// entities
import { User } from 'src/users/users.entities';
import { Offer } from 'src/offers/offers.entities';
import { Wishlist } from 'src/wishlists/wishlists.entities';

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
import {
  MIN_WISH_DESCRIPTION_LENGTH,
  MAX_WISH_DESCRIPTION_LENGTH,
  MIN_WISH_NAME_LENGTH,
  MAX_WISH_NAME_LENGTH,
} from './wishes.constants';

// content

@Entity()
@Check(`"copied" >= 0`)
@Check(`"raised" >= 0`)
@Check(`"raised" <= "price"`)
@Check(`"price" <= ${MONEY_DECIMAL_MAX_VALUE}`)
@Check(`"price" >= ${MONEY_DECIMAL_MIN_POSITIVE_VALUE}`)
export class Wish extends WithIdAndDates {
  @Length(MIN_WISH_NAME_LENGTH, MAX_WISH_NAME_LENGTH)
  @Column({
    length: MAX_WISH_NAME_LENGTH,
  })
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  link: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  image: string;

  @Length(MIN_WISH_DESCRIPTION_LENGTH, MAX_WISH_DESCRIPTION_LENGTH)
  @Column({
    length: MAX_WISH_DESCRIPTION_LENGTH,
  })
  description: string;

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
  price: number;

  @Min(0)
  @Max(MONEY_DECIMAL_MAX_VALUE)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: MONEY_DECIMAL_SCALE,
  })
  @Column({
    default: 0,
    type: 'numeric',
    scale: MONEY_DECIMAL_SCALE,
    precision: MONEY_DECIMAL_PRECISION,
    transformer: moneyTransformer,
  })
  raised: number;

  @ManyToOne(() => Wish, (wish) => wish.directCopies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  directCopyOf: Wish;

  @OneToMany(() => Wish, (wish) => wish.directCopyOf)
  directCopies: Array<Wish>;

  @ManyToOne(() => Wish, (wish) => wish.descendantCopies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  rootCopyOf: Wish;

  @OneToMany(() => Wish, (wish) => wish.rootCopyOf)
  descendantCopies: Array<Wish>;

  @IsInt()
  @Min(0)
  @Column({
    type: 'integer',
    unsigned: true,
    default: 0,
  })
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Array<Offer>;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  lists: Array<Wishlist>;
}
