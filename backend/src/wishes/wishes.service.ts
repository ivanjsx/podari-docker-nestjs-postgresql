// decorators
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

// entities
import { Wish } from './wishes.entities';
import { User } from 'src/users/users.entities';
import { Offer } from 'src/offers/offers.entities';

// data transfer objects
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

// constants
import { Direction } from 'src/common/constants';
import { RAISED_EXCEEDS_PRICE } from 'src/common/error-messages';

// content

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  public async findLast(limit: number): Promise<Array<Wish>> {
    return this.wishesRepository.find({
      relations: { owner: true, offers: true },
      order: { createdAt: Direction.DESC },
      take: limit,
    });
  }

  public async findTop(limit: number): Promise<Array<Wish>> {
    return this.wishesRepository.find({
      relations: { owner: true, offers: true },
      order: { copied: Direction.DESC },
      take: limit,
    });
  }

  public async createOne(data: CreateWishDto, owner: User): Promise<Wish> {
    const wish = this.wishesRepository.create({
      ...data,
      owner,
    });
    return this.wishesRepository.save(wish);
  }

  public async findByIdOr404(
    id: number,
    fields: FindOptionsSelect<Wish> = undefined,
    join: FindOptionsRelations<Wish> = undefined,
  ): Promise<Wish> {
    return this.wishesRepository.findOneOrFail({
      where: { id },
      select: fields,
      relations: join,
    });
  }

  public async findWithOriginsById(id: number): Promise<Wish> {
    return this.findByIdOr404(id, undefined, { rootCopyOf: true });
  }

  public async findWithOwnerAndOffersById(id: number): Promise<Wish> {
    return this.findByIdOr404(id, undefined, {
      owner: true,
      offers: {
        proposer: true,
      },
    });
  }

  public async findOnlyOwnerById(id: number): Promise<Wish> {
    return this.findByIdOr404(id, { owner: undefined }, { owner: true });
  }

  public async updateOne(id: number, data: UpdateWishDto): Promise<Wish> {
    const wish = await this.findByIdOr404(id);

    if (data.price && wish.raised > data.price) {
      throw new BadRequestException(RAISED_EXCEEDS_PRICE);
    }

    return this.wishesRepository.save({ ...wish, ...data });
  }

  public async removeOne(id: number): Promise<Wish> {
    const wish = await this.findByIdOr404(id);
    return this.wishesRepository.remove(wish);
  }

  public async copyOne(fromId: number, copycat: User): Promise<Wish> {
    const from = await this.findWithOriginsById(fromId);

    const { name, link, image, description, price } = from;
    const data: CreateWishDto = {
      name,
      link,
      image,
      description,
      price,
    };

    const to = this.wishesRepository.create({
      ...data,
      owner: copycat,
    });

    to.directCopyOf = from;

    if (from.rootCopyOf) {
      to.rootCopyOf = from.rootCopyOf;
    } else {
      to.rootCopyOf = from;
    }

    from.copied += 1;

    return this.wishesRepository
      .save(from)
      .then(() => this.wishesRepository.save(to));
  }

  public async raiseMoneyFromOffer(wish: Wish, offer: Offer): Promise<Wish> {
    if (wish.raised + offer.amount > wish.price) {
      throw new BadRequestException(RAISED_EXCEEDS_PRICE);
    }

    wish.raised += offer.amount;

    return this.wishesRepository.save(wish);
  }
}
