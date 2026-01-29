import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateSavedPostDto {
    @ApiProperty({ example: true })
    saved: boolean;
}
