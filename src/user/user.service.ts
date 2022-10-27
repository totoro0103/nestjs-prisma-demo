import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PaginatorQueryDto } from 'src/pagination/paginator-query.dto';
import { PrismaService } from 'src/prisma.service';
import { createPaginator } from 'src/utils/createPaginator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
      include: {
        posts: true,
      },
    });
  }

  findPagination(query: PaginatorQueryDto) {
    const paginate = createPaginator({});
    return paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      { include: { posts: true } },
      query,
    );
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
