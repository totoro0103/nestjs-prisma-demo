import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Seeder } from './Seeder';

@Module({
  providers: [Seeder, UserService],
})
export class SeedersModule {}
