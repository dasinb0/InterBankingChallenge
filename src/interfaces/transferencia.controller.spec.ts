import { Test, TestingModule } from '@nestjs/testing';
import { TransferenciaController } from './transferencia.controller';
import { TransferenciaService } from '../application/transferencia.service';
import { CreateTransferenciaDto } from './dtos/create-transferencia.dto';


describe('TransferenciaController', () => {
  let controller: TransferenciaController;
  let service: TransferenciaService;
  let mockTransferenciaService: {
    registrarTransferencia: jest.Mock,
    obtenerEmpresasConTransferenciasUltimoMes: jest.Mock
  };

  beforeEach(async () => {
    mockTransferenciaService = {
      registrarTransferencia: jest.fn(),
      obtenerEmpresasConTransferenciasUltimoMes: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferenciaController],
      providers: [
        { provide: TransferenciaService, useValue: mockTransferenciaService },
      ],
    }).compile();

    controller = module.get<TransferenciaController>(TransferenciaController);
    service = module.get<TransferenciaService>(TransferenciaService);
  });

  it('debería registrar una transferencia (POST)', async () => {
    const dto: CreateTransferenciaDto = {
      importe: 1000,
      empresaId: 'empresa-1',
      cuentaDebito: '123-456',
      cuentaCredito: '789-012',
      fecha: new Date().toISOString(),
    };
    const transferenciaMock = { ...dto, id: 't-1', fecha: new Date(dto.fecha) };
    mockTransferenciaService.registrarTransferencia.mockReturnValue(transferenciaMock);
    const result = await controller.registrarTransferencia(dto);
    expect(result).toEqual({
      message: 'Transferencia registrada',
      transferencia: expect.objectContaining({
        importe: dto.importe,
        empresaId: dto.empresaId,
        cuentaDebito: dto.cuentaDebito,
        cuentaCredito: dto.cuentaCredito,
        id: expect.any(String),
        fecha: expect.anything(),
      }),
    });
    expect(service.registrarTransferencia).toHaveBeenCalledWith({ ...dto, fecha: expect.any(Date) });
  });

  it('debería obtener empresas con transferencias en el último mes (GET)', () => {
    const empresasMock = [{ id: '1', cuit: '20123456789', razonSocial: 'Empresa Test', fechaAdhesion: new Date(), tipo: 'pyme' }];
    mockTransferenciaService.obtenerEmpresasConTransferenciasUltimoMes.mockReturnValue(empresasMock);
    const result = controller.obtenerEmpresasConTransferenciasUltimoMes();
    expect(result.empresas[0]).toEqual(expect.objectContaining({
      cuit: expect.any(String),
      razonSocial: expect.any(String),
      tipo: expect.any(String),
      id: expect.any(String),
      fechaAdhesion: expect.anything(),
    }));
    expect(service.obtenerEmpresasConTransferenciasUltimoMes).toHaveBeenCalled();
  });
}); 