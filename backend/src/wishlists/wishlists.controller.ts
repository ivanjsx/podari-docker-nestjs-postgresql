// libraries
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  ParseIntPipe,
  Controller,
  UseFilters,
  HttpStatus,
  UseGuards,
  HttpCode,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

// providers
import { WishlistsService } from './wishlists.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';
import { OnlyWishlistAuthor } from './wishlists.guards';

// filters
import { WishlistNotFound, WishNotFound } from 'src/common/filters';

// entities
import { User } from 'src/users/users.entities';
import { Wishlist } from './wishlists.entities';

// data transfer objects
import { UncleanedCreateWishlistDto } from './dto/create-wishlist.dto';
import { UncleanedUpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@UseGuards(JwtAuth)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @UseFilters(WishNotFound)
  async createOne(
    @Body() data: UncleanedCreateWishlistDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<Wishlist> {
    const cleanedData = data.escapeFields();
    return this.wishlistsService.createOne(cleanedData, me);
  }

  @Get()
  async findAll(): Promise<Array<Wishlist>> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @UseFilters(WishlistNotFound)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.findByIdOr404(id, undefined, {
      author: true,
      items: true,
    });
  }

  @Patch(':id')
  @UseGuards(OnlyWishlistAuthor)
  @UseFilters(WishlistNotFound, WishNotFound)
  async updateOne(
    @Body() data: UncleanedUpdateWishlistDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wishlist> {
    const cleanedData = data.escapeFields();
    return this.wishlistsService.updateOne(id, cleanedData);
  }

  @Delete(':id')
  @UseFilters(WishlistNotFound)
  @UseGuards(OnlyWishlistAuthor)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.wishlistsService.removeOne(id);
    return;
  }
}
