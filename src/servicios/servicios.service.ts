import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioTimely } from './entities/servicio.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArchivesService } from 'src/archives/archives.service';

@Injectable()
export class ServiciosService {
  
  constructor(
    @InjectRepository(ServicioTimely)
    private servicioRepository: Repository<ServicioTimely>,
    private cloudinaryService: CloudinaryService,
    private archiveService: ArchivesService,
  ) { }

  async createServicio(servicio: CreateServicioDto) {
    const servicioFound = await this.servicioRepository.findOne({
      where: {
        nombre: servicio.nombre,
      },
    });

    if (servicioFound) {
      return new HttpException('El servicio ya existe.', HttpStatus.CONFLICT);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(
      servicio.imagen,
    );

    if (uploadResult) {
      const newServicio = this.servicioRepository.create(servicio);
      const savedServicio = await this.servicioRepository.save(newServicio);

      const filename = uploadResult.secure_url;
      const salonId = 0;
      const servicioId = savedServicio.id;

      const dataArchive = {
        filename,
        salonId,
        servicioId,
      };
      await this.archiveService.createArchive(dataArchive);

      return savedServicio;
    }

  }

  getServicio() {
    return this.servicioRepository.find({
      relations: ['archives'],
    });
  }

  async getServicioId(id: number) {
    const result = await this.servicioRepository.findOne({ where: {id}});
    return result;
  }

  async deleteServicio(id: number) {
    const result = await this.servicioRepository.delete({ id });
    await this.archiveService.deleteArchiveServicio(id);
    if (result.affected === 0) {
      return new HttpException('Servicio no encontrado.', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateServicio(id: number, servicio: UpdateServicioDto, imagen: Express.Multer.File,
  ) {

    const servicioFound = await this.servicioRepository.findOne({
      where: { id, },
    });

    if (!servicioFound) {
      return new HttpException('Servicio no encontrado.', HttpStatus.NOT_FOUND);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(imagen);

    if (uploadResult) {
      const updateServicio = Object.assign(servicioFound, servicio);
      const dataServicio = this.servicioRepository.save(updateServicio);

      const filename = uploadResult.secure_url;
      const servicioId = id;

      const dataArchive = {
        filename,
        servicioId,
      };

      await this.archiveService.updateArchiveServicio(servicioId, dataArchive);

      return dataServicio;
    }
  }
}
