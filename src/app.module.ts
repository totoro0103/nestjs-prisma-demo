import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { SeedersModule } from './seeders/seeders.module';

@Module({
  imports: [UserModule, PostModule, CategoryModule, TagModule, SeedersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
