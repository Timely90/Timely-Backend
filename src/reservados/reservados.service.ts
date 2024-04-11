import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservadoDto } from './dto/create-reservado.dto';
import { UpdateReservadoDto } from './dto/update-reservado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservadoTimely } from './entities/reservado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservadosService {

  constructor(
    @InjectRepository(ReservadoTimely)
    private reservadoRepository: Repository<ReservadoTimely>,
  ) { }

  getReservados() {
    return this.reservadoRepository.find()
  }

  async deleteReservados(id: number) {
    const result = await this.reservadoRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('Reservacion no encontrado.', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async createReservados(createReservadoDto: CreateReservadoDto) {

    const reservacionFound = await this.reservadoRepository.findOne({
      where: {
        nombre: createReservadoDto.nombre,
        email: createReservadoDto.email,
      },
    });

    if (reservacionFound) {
      return new HttpException('Esta reservación ya existe.', HttpStatus.CONFLICT);
    }

    const newReservados = this.reservadoRepository.create(createReservadoDto);
    const savedReservacion = await this.reservadoRepository.save(newReservados);

    return savedReservacion;

  }
}
