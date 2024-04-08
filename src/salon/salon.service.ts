
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalonTimely } from './entities/salon.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArchivesService } from 'src/archives/archives.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';


@Injectable()
export class SalonService {

  constructor(
    @InjectRepository(SalonTimely)
    private salonRepository: Repository<SalonTimely>,
    private cloudinaryService: CloudinaryService,
    private archiveService: ArchivesService,
  ) { }


  async createSalon(salon: CreateSalonDto) {
    const salonFound = await this.salonRepository.findOne({
      where: {
        nombre: salon.nombre,
      },
    });

    if (salonFound) {
      return new HttpException('El salón ya existe.', HttpStatus.CONFLICT);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(
      salon.imagen,
    );

    if (uploadResult) {
      const newSalon = this.salonRepository.create(salon);
      const savedSalon = await this.salonRepository.save(newSalon);

      const filename = uploadResult.secure_url;

      const salonId = savedSalon.id;

      const dataArchive = {
        filename,
        salonId,
      };
      await this.archiveService.createArchive(dataArchive);

      return savedSalon;
    }

  }

  getSalon() {
    return this.salonRepository.find({
      relations: ['archives'],
    });
  }

  // async getArticle(id: number) {
  //   const artiFound = await this.articlesRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });


  //   if (!artiFound) {
  //     return new HttpException('ArtÃ­culo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   return artiFound;
  // }

  async deleteArticle(id: number) {
    const result = await this.salonRepository.delete({ id });
    await this.archiveService.deleteArchiveSalon(id);
    if (result.affected === 0) {
      return new HttpException('Salón no encontrado.', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateSalones(id: number, salon: UpdateSalonDto, imagen: Express.Multer.File,
  ) {
    const salonFound = await this.salonRepository.findOne({
      where: { id, },
    });

    if (!salonFound) {
      return new HttpException('Salón no encontrado.', HttpStatus.NOT_FOUND);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(imagen);

    if (uploadResult) {
      const updateSalon = Object.assign(salonFound, salon);
      const dataSalon = this.salonRepository.save(updateSalon);

      const filenames = uploadResult.secure_url;
      const salonId = id;

      const dataArchive = {
        filenames,
        salonId,
      };
      await this.archiveService.updateArchiveSalones(salonId, dataArchive);

      return dataSalon;
    }
  }

  // async articlesCode(cantidad: number, code: string) {
  //   const article = await this.articlesRepository.findOne({
  //     where: { code: code }
  //   });
  //   article.quantity -= cantidad;
  //   await this.articlesRepository.save(article);
  // }
}



