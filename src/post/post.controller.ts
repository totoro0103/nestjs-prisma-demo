import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { PaginatorQueryDto } from 'src/pagination/paginator-query.dto';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const { title, content, category_id, author_id, tags } = createPostDto;
    const tagsArrData = tags.split(',');
    const createOrUpdateTags = await Promise.all(
      tagsArrData.map(async (tag) => {
        return await this.tagService.create({ name: tag });
      }),
    );
    return this.postService.create({
      title: title,
      content: content,
      author: { connect: { id: author_id } },
      category: { connect: { id: category_id } },
      tags: {
        connect: createOrUpdateTags.map((t) => ({ id: t.id })),
      },
    });
  }

  @Get()
  findPagination(@Query() query: PaginatorQueryDto) {
    return this.postService.findPagination(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const { title, content, category_id, published } = updatePostDto;
    const category = await this.categoryService.findOne(category_id);
    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.BAD_REQUEST);
    }

    return this.postService.update(+id, {
      title,
      content,
      published,
      category: { connect: { id: category.id } },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
