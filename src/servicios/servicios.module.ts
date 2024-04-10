import { Module, forwardRef } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioTimely } from './entities/servicio.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ArchivesModule } from 'src/archives/archives.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicioTimely]),
    CloudinaryModule,
    forwardRef(() => ArchivesModule),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService],
})
export class ServiciosModule {}
