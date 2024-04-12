import { ApiProperty } from "@nestjs/swagger";

export class CreateReservadoDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    salon: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    horario: string;
    @ApiProperty()
    precio: number;
    @ApiProperty()
    filename: string;
    @ApiProperty()
    email: string;
}
