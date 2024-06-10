
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg';
import * as schema from  '../drizzle/schema'

export const drizzleFactory = (configService: ConfigService) => {
  const pool = new Pool({
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    user: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
  });

  return drizzle(pool, {schema});
};
