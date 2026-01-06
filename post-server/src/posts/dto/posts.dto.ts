import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class PostDto {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
