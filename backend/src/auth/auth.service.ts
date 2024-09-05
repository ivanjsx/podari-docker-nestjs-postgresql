// decorators
import { Injectable } from '@nestjs/common';

// providers
import { JwtService } from '@nestjs/jwt';

// utils
import { UserCredentialsDto, JwtPayload, AccessToken } from 'src/common/types';

// content

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(credentials: UserCredentialsDto): Promise<AccessToken> {
    const { username, id: sub } = credentials;
    const payload: JwtPayload = { username, sub };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
