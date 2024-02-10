import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  // });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  // await app.startAllMicroservices();
  await app.listen(3000).then(() => {
    console.log(
      'Reservations service started on port ' +
        configService.get('RESERVATION_PORT'),
    );
  });
}
bootstrap();
