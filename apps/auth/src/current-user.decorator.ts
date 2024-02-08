import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from './users/models/user.schema';

const getCurrentUserByContext =  (context: ExecutionContext): UsersDocument => {
  return context.switchToHttp().getRequest().user;

};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    console.log(context.switchToHttp().getRequest().Authentication)
    return getCurrentUserByContext(context);
  },
);
