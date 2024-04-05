import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Archive } from './entities/archive.entity';
import { Repository } from 'typeorm';
import { CreateArchiveDto } from './dto/create-archive.dto';


@Injectable()
export class ArchivesService {
  constructor(
    @InjectRepository(Archive) private archiveRepository: Repository<Archive>,
  ) {}


  getArticles() {
    return this.archiveRepository.find({});
  }


  async createArchive(archive: CreateArchiveDto) {
    const newArchive = this.archiveRepository.create(archive);
    return this.archiveRepository.save(newArchive);
  }


  // async deleteArchiveService(serviceId: number) {
  //   const result = await this.archiveRepository.delete({ serviceId });


  //   if (result.affected === 0) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   return result;
  // }


  // async deleteArchiveOffer(offerId: number) {
  //   const result = await this.archiveRepository.delete({ offerId });


  //   if (result.affected === 0) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   return result;
  // }


  // async deleteArchiveArticles(articleId: number) {
  //   const result = await this.archiveRepository.delete({ articleId });


  //   if (result.affected === 0) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   return result;
  // }


  // async updateArchiveService(serviceId: number, service: UpdateArchiveDto) {
  //   const artiFound = await this.archiveRepository.findOne({
  //     where: {
  //       serviceId,
  //     },
  //   });


  //   if (!artiFound) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   const updateArti = Object.assign(artiFound, service);
  //   return this.archiveRepository.save(updateArti);
  // }


  // async updateArchiveOffer(offerId: number, offer: UpdateArchivesDto) {
  //   const offerFound = await this.archiveRepository.findOne({
  //     where: {
  //       offerId,
  //     },
  //   });


  //   if (!offerFound) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   const updateArti = Object.assign(offerFound, offer);
  //   return this.archiveRepository.save(updateArti);
  // }


  // async updateArchiveArticles(articleId: number, article: UpdateArchivesDto) {
  //   const artiFound = await this.archiveRepository.findOne({
  //     where: {
  //       articleId,
  //     },
  //   });


  //   if (!artiFound) {
  //     return new HttpException('Archivo no encontrado.', HttpStatus.NOT_FOUND);
  //   }


  //   const updateArti = Object.assign(artiFound, article);
  //   return this.archiveRepository.save(updateArti);
  // }


}
