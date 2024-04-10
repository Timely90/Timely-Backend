import { ApiProperty } from "@nestjs/swagger";

export class UpdateServicioDto {
    @ApiProperty()
    nombre?: string;
    @ApiProperty()
    salon?: string;
    @ApiProperty()
    descripcion?: string;
    @ApiProperty()
    horario?: string;
    @ApiProperty()
    precio?: number;
    @ApiProperty()
    imagen?: Express.Multer.File;
}
