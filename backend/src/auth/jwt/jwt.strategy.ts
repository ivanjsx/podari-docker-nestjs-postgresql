// decorators
import { Injectable } from '@nestjs/common';

// strategies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

// providers
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

// entities
import { User } from 'src/users/users.entities';

// types
import { JwtPayload } from 'src/common/types';

// content

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.usersService.findWithWishesById(payload.sub);
  }
}
