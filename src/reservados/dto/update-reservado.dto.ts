import { ApiProperty } from "@nestjs/swagger";

export class UpdateReservadoDto {
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
    email?: string;
}
