import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return this.prisma.category.findFirst({ where: { id } });
  }

  update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
