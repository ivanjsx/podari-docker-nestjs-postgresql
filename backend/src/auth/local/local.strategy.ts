// libraries
import { Injectable, UnauthorizedException } from '@nestjs/common';

// strategies
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// providers
import { UsersService } from 'src/users/users.service';

// utils
import { UserCredentialsDto } from 'src/common/types';
import { comparePasswordWithHash } from 'src/common/helpers';

// constants
import { INCORRECT_CREDENTIALS } from 'src/common/error-messages';

// content

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserCredentialsDto> {
    const credentials =
      await this.usersService.findOnlyCredentialsByUsername(username);
    const match = await comparePasswordWithHash(password, credentials.password);
    if (!match) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    return credentials;
  }
}
