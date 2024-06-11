// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzleFactory } from '../database/drizzle/config';
import { fetchSecrets } from '../config/fetch-secrets';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DRIZZLE_CONNECTION',
      useFactory: fetchSecrets,
      // useFactory: drizzleFactory,
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_CONNECTION'],
})
export class DatabaseModule {}
