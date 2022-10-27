import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  Author = 'author',
  Guest = 'guest',
}

export enum UserState {
  Pending = 'pending',
  Activated = 'activated',
  Suspended = 'suspended',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => {
    return value.toString().toLowerCase();
  })
  email: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(6)
  name: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
