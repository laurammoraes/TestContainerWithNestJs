// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzleFactory } from '../database/drizzle/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DRIZZLE_CONNECTION',
      useFactory: drizzleFactory,
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_CONNECTION'],
})
export class DatabaseModule {}
