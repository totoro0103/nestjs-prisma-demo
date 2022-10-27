import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Seeder {
  constructor(private readonly userService: UserService) {}
  async seed() {
    // create admin user
    // create category
    //create tag
  }
}
