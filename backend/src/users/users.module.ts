// decorators
import { Module } from '@nestjs/common';

// orm
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { User } from './users.entities';

// controllers
import { UsersController } from './users.controller';

// providers
import { UsersService } from './users.service';

// content

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
