import { ApiProperty } from '@nestjs/swagger';
export class CreateArchiveDto {
  @ApiProperty()
  filename: string;
  @ApiProperty()
  salonId: number;
}
