import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole, UserState } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatorQueryDto } from 'src/pagination/paginator-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({
      name: 'abc',
      email: '...createUserDto',
      role: UserRole.Author,
      state: UserState.Pending,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get()
  findPagination(@Query() query: PaginatorQueryDto) {
    return this.userService.findPagination(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, {
      name: updateUserDto.name,
      avatar: updateUserDto.avatar,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
