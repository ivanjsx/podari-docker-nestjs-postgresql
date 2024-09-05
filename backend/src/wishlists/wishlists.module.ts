// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Wishlist } from './wishlists.entities';

// controllers
import { WishlistsController } from './wishlists.controller';

// providers
import { WishlistsService } from './wishlists.service';
import { WishesModule } from 'src/wishes/wishes.module';

// content

@Module({
  imports: [WishesModule, TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
