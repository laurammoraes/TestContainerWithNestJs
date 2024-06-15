import { Inject, Injectable } from '@nestjs/common';
import {user} from '../../providers/database/drizzle/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import * as schema from '../../providers/database/drizzle/schema'
import { eq, and, isNull } from 'drizzle-orm';


@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE_CONNECTION') private readonly db: NodePgDatabase<typeof schema>,){}

  async create(createUser) {
    await this.db.insert(user).values(createUser)
   
  }

  async findAll() {
    const response = await this.db.select().from(user).where(isNull(user.deletedAt))
    return response
  }

  async findOne(email: string) {
    const response = await this.db.select().from(user).where(and(eq(user.email, email), isNull(user.deletedAt)))
    return response
  }

  async update(email: string, updateUser) {
    await this.db.update(user).set(updateUser).where(eq(user.email, email));
   
  }

  async remove(email: string) {
    await this.db.update(user).set({ deletedAt: new Date() }).where(eq(user.email, email));
  
  }
}
