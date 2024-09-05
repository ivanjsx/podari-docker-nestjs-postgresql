// libraries
import {
  BadRequestException,
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

// providers
import { WishlistsService } from './wishlists.service';

// constants
import { NUMERIC_PARAM_EXPECTED } from 'src/common/error-messages';
import { ONLY_WISHLIST_AUTHOR_ERROR_MESSAGE } from './wishlists.constants';

// types
import { AuthenticatedRequest } from 'src/common/types';

// content

@Injectable()
export class OnlyWishlistAuthor implements CanActivate {
  constructor(private readonly wishlistsService: WishlistsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const wishlistId = parseInt(request.params.id);

    if (!wishlistId) {
      throw new BadRequestException(NUMERIC_PARAM_EXPECTED);
    }
    const wishlist = await this.wishlistsService.findOnlyAuthorById(wishlistId);

    if (wishlist.author.id !== request.user.id) {
      throw new ForbiddenException(ONLY_WISHLIST_AUTHOR_ERROR_MESSAGE);
    }

    return true;
  }
}
