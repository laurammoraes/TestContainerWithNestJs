import { Module } from '@nestjs/common';
import { AppController } from 'src/infra/controllers/app.controller'
import { AppService } from 'src/aplication/use-cases/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
