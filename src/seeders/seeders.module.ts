import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { Seeder } from './Seeder';

@Module({
  providers: [Seeder, UserService, PrismaService],
})
export class SeedersModule {}
