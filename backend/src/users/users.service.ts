// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// orm
import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

// entities
import { User } from './users.entities';

// data transfer objects
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UserCredentialsDto } from 'src/common/types';

// utils
import { ILike } from 'typeorm';
import { createHashFromPassword } from 'src/common/helpers';

// content

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async _findOr404(
    clause: FindOptionsWhere<User>,
    fields: FindOptionsSelect<User>,
    join: FindOptionsRelations<User>,
  ): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: clause,
      select: fields,
      relations: join,
    });
  }

  public async findByIdOr404(
    id: number,
    fields: FindOptionsSelect<User> = undefined,
    join: FindOptionsRelations<User> = undefined,
  ): Promise<User> {
    return this._findOr404({ id }, fields, join);
  }

  public async findByUsernameOr404(
    username: string,
    fields: FindOptionsSelect<User> = undefined,
    join: FindOptionsRelations<User> = undefined,
  ): Promise<User> {
    return this._findOr404({ username }, fields, join);
  }

  public async findWithWishesById(id: number): Promise<User> {
    return this.findByIdOr404(id, undefined, { wishes: true });
  }

  public async findOnlyCredentialsByUsername(
    username: string,
  ): Promise<UserCredentialsDto> {
    return this.findByUsernameOr404(
      username,
      {
        id: true,
        username: true,
        password: true,
      },
      undefined,
    );
  }

  public async findOnlyWishesByUsername(username: string): Promise<User> {
    return this.findByUsernameOr404(
      username,
      { wishes: true },
      { wishes: true },
    );
  }

  public async createOne(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      password: await createHashFromPassword(data.password),
    });
    return this.usersRepository.save(user);
  }

  public async updateOne(user: User, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      data.password = await createHashFromPassword(data.password);
    }
    return this.usersRepository.save({ ...user, ...data });
  }

  public async searchMany(data: SearchUserDto): Promise<Array<User>> {
    const { query } = data;
    return this.usersRepository.find({
      where: [
        { email: ILike(`%${query}%`) },
        { username: ILike(`%${query}%`) },
      ],
    });
  }
}
