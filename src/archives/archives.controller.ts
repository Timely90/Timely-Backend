import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArchivesService } from './archives.service';
import { CreateArchiveDto } from './dto/create-archive.dto';


@ApiTags('Archives')
@Controller('archives')
export class ArchivesController {
  constructor(private archiveService: ArchivesService) {}


  // @Get()
  // getArchive(): Promise<Archives[]> {
  //   return this.archiveService.getArticles();
  // }


  @Post()
  createArchive(@Body() archive: CreateArchiveDto) {
    return this.archiveService.createArchive(archive);
  }


  // @Delete(':id')
  // deleteArchiveService(@Param('id', ParseIntPipe) id: number) {
  //   return this.archiveService.deleteArchiveService(id);
  // }


  // @Delete(':id')
  // deleteArchiveOffer(@Param('id', ParseIntPipe) id: number) {
  //   return this.archiveService.deleteArchiveOffer(id);
  // }


  // @Delete(':id')
  // deleteArchiveArticles(@Param('id', ParseIntPipe) id: number) {
  //   return this.archiveService.deleteArchiveArticles(id);
  // }


  // @Patch(':id')
  // updateArchiveService(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() service: UpdateArchivesDto,
  // ) {
  //   return this.archiveService.updateArchiveService(id, service);
  // }


  // @Patch(':id')
  // updateArchiveOffer(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() offer: UpdateArchivesDto,
  // ) {
  //   return this.archiveService.updateArchiveOffer(id, offer);
  // }


  // @Patch(':id')
  // updateArchiveArticles(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() articles: UpdateArchivesDto,
  // ) {
  //   return this.archiveService.updateArchiveArticles(id, articles);
  // }
}
