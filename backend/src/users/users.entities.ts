// decorators
import { Exclude } from 'class-transformer';
import { Check, Column, Entity, OneToMany, Unique } from 'typeorm';
import { NotEquals, IsEmail, Length, IsUrl } from 'class-validator';

// entities
import { Wish } from 'src/wishes/wishes.entities';
import { Offer } from 'src/offers/offers.entities';
import { Wishlist } from 'src/wishlists/wishlists.entities';

// utils
import { WithIdAndDates } from 'src/common/entities';

// constants
import {
  MIN_USER_ABOUT_LENGTH,
  MAX_USER_ABOUT_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  DEFAULT_USER_AVATAR,
  DEFAULT_USER_ABOUT,
  ME,
} from './users.constants';

// content

@Entity()
@Unique('email', ['email'])
@Check(`"username" <> '${ME}'`)
@Unique('username', ['username'])
export class User extends WithIdAndDates {
  @Exclude()
  @IsEmail({
    allow_utf8_local_part: false,
  })
  @Column({
    unique: true,
    select: false,
  })
  email: string;

  @NotEquals(ME)
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @Column({
    length: MAX_USERNAME_LENGTH,
    unique: true,
  })
  username: string;

  @Exclude()
  @Column({
    select: false,
  })
  password: string;

  @Length(MIN_USER_ABOUT_LENGTH, MAX_USER_ABOUT_LENGTH)
  @Column({
    length: MAX_USER_ABOUT_LENGTH,
    default: DEFAULT_USER_ABOUT,
  })
  about: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column({
    default: DEFAULT_USER_AVATAR,
  })
  avatar: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Array<Wish>;

  @OneToMany(() => Offer, (offer) => offer.proposer)
  offers: Array<Offer>;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.author)
  wishlists: Array<Wishlist>;
}
