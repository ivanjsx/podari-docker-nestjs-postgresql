// decorators
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  Controller,
  UseFilters,
  UseGuards,
  Patch,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';

// providers
import { UsersService } from './users.service';

// guards
import { JwtAuth } from 'src/auth/jwt/jwt.guard';

// filters
import { UserNotFound, UserAlreadyExists } from 'src/common/filters';

// interceptors
import { HideWishesFromUser } from 'src/common/interceptors';
import { HidePasswordFromUser } from 'src/common/interceptors';

// entities
import { User } from './users.entities';
import { Wish } from 'src/wishes/wishes.entities';

// data transfer objects
import { UncleanedUpdateUserDto } from './dto/update-user.dto';
import { UncleanedSearchUserDto } from './dto/search-user.dto';

// constants
import { ME } from './users.constants';

// content

@UseGuards(JwtAuth)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(ME)
  @UseInterceptors(HideWishesFromUser)
  findMe(@CurrentlyAuthenticatedUser() me: User): User {
    return me;
  }

  @Get(`${ME}/wishes`)
  findMyWishes(@CurrentlyAuthenticatedUser() me: User): Array<Wish> {
    return me.wishes;
  }

  @Patch(ME)
  @UseFilters(UserAlreadyExists)
  @UseInterceptors(HideWishesFromUser, HidePasswordFromUser)
  async updateMe(
    @Body() data: UncleanedUpdateUserDto,
    @CurrentlyAuthenticatedUser() me: User,
  ): Promise<User> {
    const cleanedData = data.escapeFields();
    return this.usersService.updateOne(me, cleanedData);
  }

  @Get(':username')
  @UseFilters(UserNotFound)
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsernameOr404(username);
  }

  @Get(':username/wishes')
  @UseFilters(UserNotFound)
  async findOnesWishes(
    @Param('username') username: string,
  ): Promise<Array<Wish>> {
    const user = await this.usersService.findOnlyWishesByUsername(username);
    return user.wishes;
  }

  @Post('find')
  async searchMany(@Body() data: UncleanedSearchUserDto): Promise<Array<User>> {
    const cleanedData = data.escapeFields();
    return this.usersService.searchMany(cleanedData);
  }
}
