
import { ApiProperty } from "@nestjs/swagger";

export class UpdateArchiveDto {
    @ApiProperty()
    filenames: string;
    @ApiProperty()
    salonId: number;
}
