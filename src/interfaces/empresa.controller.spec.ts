import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from '../application/empresa.service';
import { CreateEmpresaDto } from './dtos/create-empresa.dto';

describe('EmpresaController', () => {
  let controller: EmpresaController;
  let service: EmpresaService;
  let mockEmpresaService: {
    registrarEmpresa: jest.Mock,
    obtenerEmpresasAdheridasUltimoMes: jest.Mock
  };

  beforeEach(async () => {
    mockEmpresaService = {
      registrarEmpresa: jest.fn(),
      obtenerEmpresasAdheridasUltimoMes: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        { provide: EmpresaService, useValue: mockEmpresaService },
      ],
    }).compile();

    controller = module.get<EmpresaController>(EmpresaController);
    service = module.get<EmpresaService>(EmpresaService);
  });

  it('debería registrar una empresa (POST)', async () => {
    const dto: CreateEmpresaDto = {
      cuit: '20123456789',
      razonSocial: 'Empresa Test',
      fechaAdhesion: new Date().toISOString(),
      tipo: 'pyme',
    };
    const empresaMock = { ...dto, id: '1' };
    mockEmpresaService.registrarEmpresa.mockReturnValue(empresaMock);
    const result = await controller.registrarEmpresa(dto);
    expect(result).toEqual({
      message: 'Empresa registrada',
      empresa: expect.objectContaining({
        cuit: dto.cuit,
        razonSocial: dto.razonSocial,
        tipo: dto.tipo,
        id: expect.any(String),
        fechaAdhesion: expect.anything(),
      }),
    });
    expect(service.registrarEmpresa).toHaveBeenCalledWith(dto);
  });

  it('debería obtener empresas adheridas en el último mes (GET)', () => {
    const empresasMock = [{ id: '1', cuit: '20123456789', razonSocial: 'Empresa Test', fechaAdhesion: new Date(), tipo: 'pyme' }];
    mockEmpresaService.obtenerEmpresasAdheridasUltimoMes.mockReturnValue(empresasMock);
    const result = controller.obtenerEmpresasAdheridasUltimoMes();
    expect(result.empresas[0]).toEqual(expect.objectContaining({
      cuit: expect.any(String),
      razonSocial: expect.any(String),
      tipo: expect.any(String),
      id: expect.any(String),
      fechaAdhesion: expect.anything(),
    }));
    expect(service.obtenerEmpresasAdheridasUltimoMes).toHaveBeenCalled();
  });
}); 