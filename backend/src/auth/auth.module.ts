// decorators
import { Module } from '@nestjs/common';

// modules
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

// providers
import { AuthService } from './auth.service';
import { JwtConfigFactory } from 'src/config/jwt-config.factory';

// controllers
import { AuthController } from './auth.controller';

// strategies
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

// content

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
