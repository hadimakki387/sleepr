import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [LoggerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService,ConfigService],
})
export class PaymentsModule {}
