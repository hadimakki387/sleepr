import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserSchema, UsersDocument } from './models/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.respository';
import { JwtStrategy } from '../strategies/jwt.startegy';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}
