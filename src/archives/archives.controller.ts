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

  @Post()
  createArchive(@Body() archive: CreateArchiveDto) {
    return this.archiveService.createArchive(archive);
  }

}
