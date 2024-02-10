import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule, PAYMENTS_SERVICE, TEST_SERVICE } from '@app/common';
import { ReservationRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => {
          const host = configService.get('AUTH_HTTP_PORT');
          const port = configService.get('AUTH_TCP_PORT');
          console.log(`Connecting to AUTH_SERVICE at ${host}:${port}`);
          return {
            transport: Transport.TCP,
            options: { host: host, port: port },
          };
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => {
          const host = '0.0.0.0';
          const port = configService.get('PAYMENTS_TCP_PORT');
          console.log(`Connecting to PAYMENTS_SERVICE at ${host}:${port}`);
          return {
            transport: Transport.TCP,
            options: { host: host, port: port },
          };
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: TEST_SERVICE,
        useFactory: (configService: ConfigService) => {
          const host = configService.get('PAYMENTS_HTTP_PORT');
          const port = configService.get('PAYMENTS_TCP_PORT');
          console.log(`Connecting to PAYMENTS_SERVICE at ${host}:${port}`);
          return {
            transport: Transport.TCP,
            options: { host: '0.0.0.0', port: 3011 },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
