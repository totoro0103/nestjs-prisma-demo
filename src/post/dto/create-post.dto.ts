import { Tag } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  published: boolean | false;

  @IsNotEmpty()
  author_id: number;

  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  @IsString()
  tags: string;
}
