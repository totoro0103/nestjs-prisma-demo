import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    UserService,
    CategoryService,
    TagService,
  ],
})
export class PostModule {}
