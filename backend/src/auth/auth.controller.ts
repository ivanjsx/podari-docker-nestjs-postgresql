// decorators
import { CurrentlyAuthenticatedUser } from 'src/common/decorators';
import {
  UseInterceptors,
  Controller,
  UseFilters,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';

// providers
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

// guards
import { LocalAuth } from './local/local.guard';

// filters
import { IncorrectUsername, UserAlreadyExists } from 'src/common/filters';

// interceptors
import { HidePasswordFromUser } from 'src/common/interceptors';

// entities
import { User } from 'src/users/users.entities';

// utils
import { UserCredentialsDto, AccessToken } from 'src/common/types';
import { UncleanedCreateUserDto } from 'src/users/dto/create-user.dto';

// content

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @UseFilters(UserAlreadyExists)
  @UseInterceptors(HidePasswordFromUser)
  async signUp(@Body() data: UncleanedCreateUserDto): Promise<User> {
    const cleanedData = data.escapeFields();
    return this.usersService.createOne(cleanedData);
  }

  @Post('signin')
  @UseGuards(LocalAuth)
  @UseFilters(IncorrectUsername)
  async signIn(
    @CurrentlyAuthenticatedUser()
    credentials: UserCredentialsDto,
  ): Promise<AccessToken> {
    return this.authService.authenticate(credentials);
  }
}
