import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';

describe('AsignaturaController', () => {
  let controller: AsignaturaController;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignaturaController],
      providers: [AsignaturaService],
    })
      .overrideProvider(AsignaturaService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<AsignaturaController>(AsignaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
