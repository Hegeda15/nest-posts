import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { users } from 'db/schema';

@Injectable()
export class UsersService {
  async getUSers() {
    return await db.select().from(users);
  }
 
 
}
