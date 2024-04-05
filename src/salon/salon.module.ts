import { Module, forwardRef } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { ArchivesModule } from 'src/archives/archives.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonTimely } from './entities/salon.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([SalonTimely]),
    CloudinaryModule,
    forwardRef(() => ArchivesModule),
  ],
  controllers: [SalonController],
  providers: [SalonService],
  exports: [SalonService]
})
export class SalonModule {}