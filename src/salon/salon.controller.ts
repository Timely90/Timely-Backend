import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SalonTimely } from './entities/salon.entity';
import { UpdateSalonDto } from './dto/update-salon.dto';

@ApiTags('Salon')
@Controller('salon')
export class SalonController {
  constructor(private salonService: SalonService) { }

  @Get()
  getSalon(): Promise<SalonTimely[]> {
    return this.salonService.getSalon();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  createSalon(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() newSalon: CreateSalonDto,
  ) {
    return this.salonService.createSalon({ ...newSalon, imagen });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  updateSalon(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() imagen: Express.Multer.File,
    @Body() salon: UpdateSalonDto,
  ) {
    return this.salonService.updateSalones( id, salon, imagen);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.salonService.deleteArticle(id);
  }

}
