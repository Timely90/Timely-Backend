import { Module, forwardRef } from '@nestjs/common';
import { ArchivesController } from './archives.controller';
import { ArchivesService } from './archives.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archive } from './entities/archive.entity';
import { SalonModule } from 'src/salon/salon.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Archive]),
    forwardRef(() => SalonModule),
  ],
  controllers: [ArchivesController],
  providers: [ArchivesService],
  exports: [ArchivesService],
})
export class ArchivesModule {}