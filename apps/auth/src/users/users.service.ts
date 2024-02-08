import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/crete-user.dto';
import { UsersRepository } from './users.respository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    await this.validateUserDto(createUserDto)
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateUserDto(createUserDto: CreateUserDto){
    try{
        await this.usersRepository.findOne({email: createUserDto.email})
    }catch(err){
        return
    }
    throw new UnprocessableEntityException('User already exists')
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(getUserDto:GetUserDto){
    return this.usersRepository.findOne(getUserDto)
  }
}
