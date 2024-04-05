
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Salon } from './entities/salon.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArchivesService } from 'src/archives/archives.service';
import { CreateSalonDto } from './dto/create-salon.dto';


@Injectable()
export class SalonService {


  constructor(
    @InjectRepository(Salon)
    private salonRepository: Repository<Salon>,
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


      const filenames = uploadResult.map((item) => item.secure_url);
      const salonId = savedSalon.id;


      for (const filename of filenames) {
        const dataArchive = {
          filename,
          salonId,
        };
        await this.archiveService.createArchive(dataArchive);
      }
      return savedSalon;
    }
  }


  // getArticles() {
  //   return this.articlesRepository.find({
  //     relations: ['archives'],
  //   });
  // }


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


  // async deleteArticle(id: number) {
  //   const result = await this.articlesRepository.delete({ id });
  //   await this.archiveService.deleteArchiveArticles(id);
  //   if (result.affected === 0) {
  //     return new HttpException('ArtÃ­culo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   return result;
  // }


  // async updateArticles(
  //   id: number,
  //   articles: UpdateArticlesDto,
  //   imagen: Express.Multer.File[],
  // ) {
  //   const articlesFound = await this.articlesRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });


  //   if (!articlesFound) {
  //     return new HttpException('ArtÃ­culo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   const uploadResult = await this.cloudinaryService.uploadFile(imagen);


  //   if (uploadResult) {
  //     const updateArticles = Object.assign(articlesFound, articles);
  //     const dataArticles = this.articlesRepository.save(updateArticles);


  //     const filenames = uploadResult.map((item) => item.secure_url);
  //     const serviceId = 0;
  //     const articleId = id;
  //     const offerId = 0;


  //     for (const filename of filenames) {
  //       const dataArchive = {
  //         filename,
  //         serviceId,
  //         articleId,
  //         offerId,
  //       };


  //       await this.archiveService.updateArchiveArticles(articleId, dataArchive);
  //     }
  //     return dataArticles;
  //   }
  // }


  // async articlesCode(cantidad: number, code: string) {
  //   const article = await this.articlesRepository.findOne({
  //     where: { code: code }
  //   });
  //   article.quantity -= cantidad;
  //   await this.articlesRepository.save(article);
  // }
}



