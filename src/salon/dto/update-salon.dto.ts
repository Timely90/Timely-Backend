import { ApiProperty } from '@nestjs/swagger';

export class UpdateSalonDto {
    @ApiProperty()
    nombre?: string;
    @ApiProperty()
    descripcion?: string;
    @ApiProperty()
    capacidad?: number;
    @ApiProperty()
    ubicacion?: number;
    @ApiProperty()
    imagen?: Express.Multer.File[];
}
