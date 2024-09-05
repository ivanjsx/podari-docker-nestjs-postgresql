// decorators
import { IsUrl, Length } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

// entities
import { User } from 'src/users/users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// utils
import { WithIdAndDates } from 'src/common/entities';

// constants
import {
  MIN_WISHLIST_DESCRIPTION_LENGTH,
  MAX_WISHLIST_DESCRIPTION_LENGTH,
  MIN_WISHLIST_NAME_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from './wishlists.constants';

// content

@Entity()
export class Wishlist extends WithIdAndDates {
  @Length(MIN_WISHLIST_NAME_LENGTH, MAX_WISHLIST_NAME_LENGTH)
  @Column({
    length: MAX_WISHLIST_NAME_LENGTH,
  })
  name: string;

  @IsUrl({
    protocols: ['http', 'https'],
  })
  @Column()
  image: string;

  @Length(MIN_WISHLIST_DESCRIPTION_LENGTH, MAX_WISHLIST_DESCRIPTION_LENGTH)
  @Column({
    nullable: true,
    length: MAX_WISHLIST_DESCRIPTION_LENGTH,
  })
  description: string;

  @ManyToOne(() => User, (user) => user.wishlists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: User;

  @ManyToMany(() => Wish, (wish) => wish.lists)
  @JoinTable()
  items: Array<Wish>;
}
