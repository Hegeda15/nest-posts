import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  content: string;
 
}
