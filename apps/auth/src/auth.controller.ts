import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async createUser(
    @CurrentUser() user: UsersDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(user)
    await this.authService.login(user, res);
    res.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data:any){  
    return data.user
   
  }
}
