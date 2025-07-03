import { EmpresaService } from './empresa.service';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { CreateEmpresaDto } from '../interfaces/dtos/create-empresa.dto';

describe('EmpresaService', () => {
  let empresaService: EmpresaService;
  let empresaRepo: EmpresaRepository;

  beforeEach(() => {
    empresaRepo = new EmpresaRepository();
    empresaService = new EmpresaService(empresaRepo);
  });

  it('debería registrar una empresa', () => {
    const dto: CreateEmpresaDto = {
      cuit: '20123456789',
      razonSocial: 'Empresa Test',
      fechaAdhesion: new Date().toISOString(),
      tipo: 'pyme',
    };
    const empresa = empresaService.registrarEmpresa(dto);
    expect(empresa).toHaveProperty('id');
    expect(empresa.cuit).toBe(dto.cuit);
    expect(empresa.razonSocial).toBe(dto.razonSocial);
    expect(empresa.tipo).toBe(dto.tipo);
  });

  it('debería obtener empresas adheridas en el último mes', () => {
    // Empresa dentro del último mes
    empresaService.registrarEmpresa({
      cuit: '20123456789',
      razonSocial: 'Empresa Reciente',
      fechaAdhesion: new Date().toISOString(),
      tipo: 'pyme',
    });
    // Empresa fuera del último mes
    empresaRepo.create({
      id: 'old',
      cuit: '20999999999',
      razonSocial: 'Empresa Antigua',
      fechaAdhesion: new Date('2000-01-01'),
      tipo: 'corporativa',
    });
    const empresas = empresaService.obtenerEmpresasAdheridasUltimoMes();
    expect(empresas.length).toBe(1);
    expect(empresas[0].razonSocial).toBe('Empresa Reciente');
  });
}); 