// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { WishesService } from 'src/wishes/wishes.service';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

// entities
import { User } from 'src/users/users.entities';
import { Wishlist } from './wishlists.entities';

// data transfer objects
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// content

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  public async createOne(
    data: CreateWishlistDto,
    author: User,
  ): Promise<Wishlist> {
    const { itemsId, name, image, description } = data;
    const wishes = await Promise.all(
      itemsId.map((id) => this.wishesService.findByIdOr404(id)),
    );

    const wishlist = this.wishlistsRepository.create({
      name,
      image,
      description,
      author,
      items: wishes,
    });

    return this.wishlistsRepository.save(wishlist);
  }

  public async findAll(): Promise<Array<Wishlist>> {
    return this.wishlistsRepository.find({
      relations: { author: true, items: true },
    });
  }

  public async findByIdOr404(
    id: number,
    fields: FindOptionsSelect<Wishlist> = undefined,
    join: FindOptionsRelations<Wishlist> = undefined,
  ): Promise<Wishlist> {
    return this.wishlistsRepository.findOneOrFail({
      where: { id },
      select: fields,
      relations: join,
    });
  }

  public async findOnlyAuthorById(id: number): Promise<Wishlist> {
    return this.findByIdOr404(id, { author: undefined }, { author: true });
  }

  async updateOne(id: number, data: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findByIdOr404(id);
    const { itemsId, name, image, description } = data;
    if (itemsId) {
      const wishes = await Promise.all(
        itemsId.map((id) => this.wishesService.findByIdOr404(id)),
      );
      wishlist.items = wishes;
    }
    return this.wishlistsRepository.save({
      ...wishlist,
      name,
      image,
      description,
    });
  }

  async removeOne(id: number): Promise<Wishlist> {
    const wish = await this.findByIdOr404(id);
    return this.wishlistsRepository.remove(wish);
  }
}
