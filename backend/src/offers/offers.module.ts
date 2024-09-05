// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Offer } from './offers.entities';

// controllers
import { OffersController } from './offers.controller';

// providers
import { OffersService } from './offers.service';
import { WishesModule } from 'src/wishes/wishes.module';

// content

@Module({
  imports: [WishesModule, TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
