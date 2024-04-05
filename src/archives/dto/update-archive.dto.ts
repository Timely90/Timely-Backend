
import { ApiProperty } from "@nestjs/swagger";

export class UpdateArchiveDto {
    @ApiProperty()
    filename: string;
    @ApiProperty()
    salonId: number;
}
