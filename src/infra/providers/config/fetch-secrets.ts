import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import * as schema from  '../../providers/database/drizzle/schema'


export const fetchSecrets = () => {
    if(process.env.type == 'test'){
        const pool = new Pool({
            host: process.env.CONTAINER_HOST,
            port: process.env.CONTAINER_PORT,
            user: process.env.CONTAINER_USERNAME,
            password: process.env.CONTAINER_PASSWORD,
            database: process.env.CONTAINER_NAME,
        })
        return drizzle(pool, {schema});

    }else {
        const pool = new Pool({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        })
        return drizzle(pool, {schema});
    }
}