import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveTimely } from './entities/archive.entity';
import { Repository } from 'typeorm';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';

@Injectable()
export class ArchivesService {
  constructor(
    @InjectRepository(ArchiveTimely) private archiveRepository: Repository<ArchiveTimely>,
  ) { }

  getArticles() {
    return this.archiveRepository.find({});
  }

  async createArchive(archive: CreateArchiveDto) {
    const newArchive = this.archiveRepository.create(archive);
    return this.archiveRepository.save(newArchive);
  }

  async deleteArchiveSalon(salonId: number) {
    const result = await this.archiveRepository.delete({ salonId });

    if (result.affected === 0) {
      return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async deleteArchiveServicio(servicioId: number) {
    const result = await this.archiveRepository.delete({ servicioId });

    if (result.affected === 0) {
      return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async getArchiveServiceId(servicioId: number) {
    const serFound = await this.archiveRepository.findOne({
      where: {
        servicioId,
      },
    });
    return serFound;
  }

  async updateArchiveSalones(salonId: number, salon: UpdateArchiveDto) {
    const salFound = await this.archiveRepository.findOne({
      where: {
        salonId,
      },
    });

    if (!salFound) {
      return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const updateArti = Object.assign(salFound, salon);
    return this.archiveRepository.save(updateArti);
  }

  async updateArchiveServicio(servicioId: number, servicio: UpdateArchiveDto) {
    const servicioFound = await this.archiveRepository.findOne({
      where: {
        servicioId,
      },
    });

    if (!servicioFound) {
      return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const updateArti = Object.assign(servicioFound, servicio);
    return this.archiveRepository.save(updateArti);
  }

}
