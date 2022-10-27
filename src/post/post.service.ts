import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PaginatorQueryDto } from 'src/pagination/paginator-query.dto';
import { PrismaService } from 'src/prisma.service';
import { createPaginator } from 'src/utils/createPaginator';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: createPostDto,
      include: { author: true, category: true, tags: true },
    });
  }

  findAll() {
    return `This action returns all post`;
  }
  findPagination(query: PaginatorQueryDto) {
    const paginate = createPaginator({});
    return paginate<Post, Prisma.PostFindManyArgs>(
      this.prisma.post,
      { include: { author: true, category: true, tags: true } },
      query,
    );
  }
  findOne(id: number) {
    return this.prisma.post.findFirst({
      where: { id },
      include: { author: true, category: true, tags: true },
    });
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
