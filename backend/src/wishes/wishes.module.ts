// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Wish } from './wishes.entities';

// controllers
import { WishesController } from './wishes.controller';

// providers
import { WishesService } from './wishes.service';

// content

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export class WishesModule {}
