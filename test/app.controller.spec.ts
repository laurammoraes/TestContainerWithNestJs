import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/infra/controllers/app.controller';
import { AppService } from '../src/aplication/use-cases/app.service'

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],  // Verifique se todos os pontos e vírgulas estão presentes
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
