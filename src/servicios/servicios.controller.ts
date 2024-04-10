import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiTags } from '@nestjs/swagger';
import { ServicioTimely } from './entities/servicio.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Servicio')
@Controller('servicio')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  getServicio(): Promise<ServicioTimely[]> {
    return this.serviciosService.getServicio();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  createServicio(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() newSalon:CreateServicioDto,
  ) {
    return this.serviciosService.createServicio({ ...newSalon, imagen });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  updateSalon(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() imagen: Express.Multer.File,
    @Body() servicio: UpdateServicioDto,
  ) {
    return this.serviciosService.updateServicio( id, servicio, imagen);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.deleteServicio(id);
  }
}
