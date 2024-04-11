import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { Paypal } from './entities/paypal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosModule } from 'src/servicios/servicios.module';
import { ReservadosModule } from 'src/reservados/reservados.module';

@Module({
  imports:[TypeOrmModule.forFeature([Paypal]),
  ServiciosModule, ReservadosModule
],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
