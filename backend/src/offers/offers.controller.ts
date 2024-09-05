// libraries
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  ParseIntPipe,
  Controller,
  UseFilters,
  UseGuards,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { OffersService } from './offers.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';
import { OnlySomeoneElsesWish } from './offers.guards';

// filters
import { WishNotFound, OfferNotFound } from 'src/common/filters';

// interceptors
import { HideItemFromOffer } from 'src/common/interceptors';

// entities
import { Offer } from './offers.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { UncleanedCreateOfferDto } from './dto/create-offer.dto';

// content

@UseGuards(JwtAuth)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseFilters(WishNotFound)
  @UseGuards(OnlySomeoneElsesWish)
  @UseInterceptors(HideItemFromOffer)
  async createOne(
    @Body() data: UncleanedCreateOfferDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Offer> {
    const cleanedData = data.escapeFields();
    return this.offersService.createOne(cleanedData, me);
  }

  @Get()
  async findAll(): Promise<Array<Offer>> {
    return this.offersService.findAll();
  }

  @Get(':id')
  @UseFilters(OfferNotFound)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findByIdOr404(id);
  }
}
