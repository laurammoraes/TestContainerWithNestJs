import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {user} from '../../providers/database/drizzle/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import * as schema from '../../providers/database/drizzle/schema'
import { eq, isNotNull, and, isNull } from 'drizzle-orm';


@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE_CONNECTION') private readonly db: NodePgDatabase<typeof schema>,){}

  async create(createUserDto: CreateUserDto) {
    await this.db.insert(user).values(createUserDto)
   
  }

  async findAll() {
    const response = await this.db.select().from(user).where(isNull(user.deletedAt)).execute()
    return response
  }

  async findOne(email: string) {
    const response = await this.db.select().from(user).where(and(eq(user.email, email), isNull(user.deletedAt))).execute()
    return response
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    await this.db.update(user).set(updateUserDto).where(eq(user.email, email));
   
  }

  async remove(email: string) {
    await this.db.update(user).set({ deletedAt: new Date() }).where(eq(user.email, email));
  
  }
}
