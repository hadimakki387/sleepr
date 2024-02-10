import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [ConfigModule,LoggerModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
