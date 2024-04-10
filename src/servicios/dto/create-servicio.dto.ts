import { ApiProperty } from "@nestjs/swagger";

export class CreateServicioDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    salon: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    horario: string;
    @ApiProperty()
    imagen: Express.Multer.File;
}
