import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservadosService } from './reservados.service';
import { ReservadoTimely } from './entities/reservado.entity';

@Controller('reservados')
export class ReservadosController {
  constructor(private readonly reservadosService: ReservadosService) { }

  @Get()
  getReservados(): Promise<ReservadoTimely[]> {
    return this.reservadosService.getReservados();
  }

  @Delete(':id')
  deleteReservados(@Param('id', ParseIntPipe) id: number) {
    return this.reservadosService.deleteReservados(id);
  }

}
