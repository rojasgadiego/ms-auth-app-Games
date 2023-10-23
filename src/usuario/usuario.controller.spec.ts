import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findOne: jest.fn((email) => {
      return {
        id: Date.now(),
        ...email,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [UsuarioService],
    })
      .overrideProvider(UsuarioService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should Create a user', () => {
    expect(
      controller.create({
        fullName: 'testuser',
        email: 'test@gmail.com',
        password: 'Vgryq178',
      }),
    ).toEqual({
      id: expect.any(Number),
      fullName: 'testuser',
      email: 'test@gmail.com',
      password: 'Vgryq178',
    });

    expect(mockUsersService.create).toHaveBeenCalled();
  });

  it('should FindOne a user', () => {
    expect(controller.findOne('test@test.com'));

    expect(mockUsersService.findOne).toHaveBeenCalled();
  });
});
