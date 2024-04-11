import { Module } from '@nestjs/common';
import { ReservadosService } from './reservados.service';
import { ReservadosController } from './reservados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservadoTimely } from './entities/reservado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservadoTimely]),
  ],
  controllers: [ReservadosController],
  providers: [ReservadosService],
  exports: [ReservadosService],
})
export class ReservadosModule {}
