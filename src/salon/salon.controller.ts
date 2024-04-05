import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { SalonService } from './salon.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Salon')
@Controller('salon')
export class SalonController {
  constructor(private salonService: SalonService) { }


  // @Get()
  // getArticles(): Promise<Articles[]> {
  //   return this.articlesService.getArticles();
  // }


  // @Get(':id')
  // getArticle(@Param('id', ParseIntPipe) id: number) {
  //   return this.articlesService.getArticle(id);
  // }


  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  createArticle(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() newSalon: CreateSalonDto,
  ) {
    return this.salonService.createSalon({ ...newSalon, imagen });
  }


  // @Delete(':id')
  // deleteArticle(@Param('id', ParseIntPipe) id: number) {
  //   return this.articlesService.deleteArticle(id);
  // }


  // @Patch(':id')
  // @UseInterceptors(FilesInterceptor('imagen', 10))
  // updateOffer(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFiles() imagen: Express.Multer.File[],
  //   @Body() articles: UpdateArticlesDto,
  // ) {
  //   return this.articlesService.updateArticles(id, articles, imagen);
  // }
}
