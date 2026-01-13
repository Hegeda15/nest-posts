import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import e from "express";

export class CommentsDto {
    @Expose()
    @IsString()
    content: string;
}