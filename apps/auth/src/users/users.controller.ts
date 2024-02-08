import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/crete-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UsersDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

  @Post()
  async createUser(@Body() createUserDto:CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  async getUser(@CurrentUser() user: UsersDocument){
    console.log("hit")
    console.log(user)
    return user
  }
}
