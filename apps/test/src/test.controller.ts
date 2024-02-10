import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @MessagePattern('greeting')
  getHello(): string {
    console.log('it hit greeting')
    return this.testService.getHello();
  }
}
