// libraries
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// types
import { AuthenticatedRequest } from './types';

// content

export const CurrentlyAuthenticatedUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
