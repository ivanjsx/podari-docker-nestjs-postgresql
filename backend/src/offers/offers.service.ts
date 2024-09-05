// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';

// entities
import { Offer } from './offers.entities';
import { User } from 'src/users/users.entities';

// data transfer objects
import { CreateOfferDto } from './dto/create-offer.dto';

// content

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  public async createOne(data: CreateOfferDto, proposer: User): Promise<Offer> {
    const { itemId, hidden, amount } = data;
    const wish = await this.wishesService.findByIdOr404(itemId);

    const offer = this.offersRepository.create({
      hidden,
      amount,
      proposer,
      item: wish,
    });

    return this.wishesService
      .raiseMoneyFromOffer(wish, offer)
      .then(() => this.offersRepository.save(offer));
  }

  public async findAll(): Promise<Array<Offer>> {
    return this.offersRepository.find({
      relations: { item: true, proposer: true },
    });
  }

  public async findByIdOr404(id: number): Promise<Offer> {
    return this.offersRepository.findOneByOrFail({ id });
  }
}
