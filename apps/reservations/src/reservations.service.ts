import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, TEST_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservaitonRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
    @Inject(TEST_SERVICE) private readonly testService: ClientProxy,
  ) {}
  async test() {
    return firstValueFrom(this.testService.send('greeting', '')).then((res) => {
      console.log('this is the res' + res);
      return res;
    });
  }
  async create(createReservationDto: CreateReservationDto, userId: string) {
   return this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (res) => {
          const reservation = await this.reservaitonRepository.create({
            ...createReservationDto,
            invoiceId:res.id,
            timestamp: new Date(),
            userId,
          });
          return reservation;
        }),
      );
  }

  async findAll() {
    return this.reservaitonRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservaitonRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservaitonRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservaitonRepository.findOneAndDelete({ _id });
  }
}
