// libraries
import { Observable, map } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';

// entities
import { User } from 'src/users/users.entities';
import { Wish } from 'src/wishes/wishes.entities';
import { Offer } from 'src/offers/offers.entities';

// content

@Injectable()
export class HidePasswordFromUser implements NestInterceptor<User, User> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }
}

@Injectable()
export class HideWishesFromUser implements NestInterceptor<User, User> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user: User) => {
        delete user.wishes;
        return user;
      }),
    );
  }
}

@Injectable()
export class HideItemFromOffer implements NestInterceptor<Offer, Offer> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Offer>,
  ): Observable<Offer> {
    return next.handle().pipe(
      map((offer: Offer) => {
        delete offer.item;
        return offer;
      }),
    );
  }
}

@Injectable()
export class HideHiddenOffersFromWish implements NestInterceptor<Wish, Wish> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Wish>,
  ): Observable<Wish> {
    return next.handle().pipe(
      map((wish: Wish) => {
        wish.offers = wish.offers.filter((offer) => !offer.hidden);
        return wish;
      }),
    );
  }
}

@Injectable()
export class HideOwnersWishesFromWish implements NestInterceptor<Wish, Wish> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Wish>,
  ): Observable<Wish> {
    return next.handle().pipe(
      map((wish: Wish) => {
        delete wish.owner.wishes;
        return wish;
      }),
    );
  }
}
