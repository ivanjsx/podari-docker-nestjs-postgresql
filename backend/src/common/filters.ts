// libraries
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
} from '@nestjs/common';

// exceptions
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

// constants
import {
  INCORRECT_CREDENTIALS,
  USER_ALREADY_EXISTS,
  WISHLIST_NOT_FOUND,
  OFFER_NOT_FOUND,
  USER_NOT_FOUND,
  WISH_NOT_FOUND,
} from './error-messages';

// types
import { Response } from 'express';

// content

@Catch(QueryFailedError)
export class UserAlreadyExists implements ExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      error: 'Conflict',
      message: USER_ALREADY_EXISTS,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

@Catch(EntityNotFoundError)
export class IncorrectUsername implements ExceptionFilter<EntityNotFoundError> {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'Unauthorized',
      message: INCORRECT_CREDENTIALS,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

@Catch(EntityNotFoundError)
export class UserNotFound implements ExceptionFilter<EntityNotFoundError> {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      message: USER_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

@Catch(EntityNotFoundError)
export class WishNotFound implements ExceptionFilter<EntityNotFoundError> {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      message: WISH_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

@Catch(EntityNotFoundError)
export class OfferNotFound implements ExceptionFilter<EntityNotFoundError> {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      message: OFFER_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

@Catch(EntityNotFoundError)
export class WishlistNotFound implements ExceptionFilter<EntityNotFoundError> {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      error: 'Not Found',
      message: WISHLIST_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
