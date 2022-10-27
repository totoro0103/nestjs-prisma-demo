import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTagDto: Prisma.TagCreateInput): Promise<Tag> {
    const tagUnique = await this.prisma.tag.findUnique({
      where: { name: createTagDto.name },
    });
    let tag: Tag;
    if (!tagUnique?.frequency) {
      tag = await this.prisma.tag.create({
        data: { name: createTagDto.name },
      });
    } else {
      tag = await this.prisma.tag.update({
        where: { name: createTagDto.name },
        data: { frequency: tagUnique.frequency + 1 },
      });
    }
    return tag;
  }

  async createMany(tags: Prisma.TagCreateManyInput[]) {
    return this.prisma.tag.createMany({
      data: tags,
      skipDuplicates: true,
    });
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
