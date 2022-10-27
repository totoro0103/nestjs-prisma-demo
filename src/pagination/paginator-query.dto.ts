import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginatorQueryDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit: number;

  @IsString()
  @IsOptional()
  @IsEnum(['asc', 'desc'], { each: true })
  sort: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  sort_by: string;
}
